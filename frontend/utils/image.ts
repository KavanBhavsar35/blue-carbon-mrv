// File: app/(dashboard)/register-project/_utils/image-upload.ts

export interface ImageUploadResult {
  urls: string[];
  filenames: string[];
  errors: string[];
}

export interface ImageValidation {
  isValid: boolean;
  error?: string;
}

export interface ProjectPhoto {
  id: string;
  filename: string; // Format: /projectId-imageName-timestamp.ext
  category: "site-current" | "site-reference" | "documentation";
  description?: string;
  url: string; // Preview URL (blob URL)
  size: number;
  uploadDate: string;
  file?: File; // Keep file reference for later upload
}

// Temporary storage for preview images during registration
const previewImages = new Map<string, File>();

export const validateImage = (file: File): ImageValidation => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only JPG, PNG, and WebP files are allowed",
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File size must be less than 5MB",
    };
  }

  return { isValid: true };
};

export const compressImage = (
  file: File,
  quality: number = 0.8,
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality,
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

export const generateImageFilename = (
  originalName: string,
  projectId?: string,
): string => {
  // Use temporary ID during registration, will be replaced with actual project ID on submit
  const pid = projectId || "temp";
  const timestamp = Date.now();
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const cleanName = originalName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[^a-zA-Z0-9]/g, "-") // Replace special chars with dash
    .substring(0, 20); // Limit length

  return `/${pid}-${cleanName}-${timestamp}.${extension}`;
};

export const getProjImgPath = (filename: string): string => {
  // Remove leading slash for relative path
  return `uploads${filename}`;
};

export const storePreviewImage = async (
  files: File[],
  projectId?: string,
): Promise<ProjectPhoto[]> => {
  const photos: ProjectPhoto[] = [];

  for (const file of files) {
    const validation = validateImage(file);

    if (!validation.isValid) {
      throw new Error(`${file.name}: ${validation.error}`);
    }

    const compressedFile = await compressImage(file);
    const filename = generateImageFilename(file.name, projectId);
    const previewUrl = URL.createObjectURL(compressedFile);

    // Store file for later upload
    previewImages.set(filename, compressedFile);

    photos.push({
      id: crypto.randomUUID(),
      filename,
      category: "site-current",
      description: "",
      url: previewUrl,
      size: compressedFile.size,
      uploadDate: new Date().toISOString(),
      file: compressedFile,
    });
  }

  return photos;
};

export const uploadProjectImages = async (
  photos: ProjectPhoto[],
  actualProjectId: string,
): Promise<ImageUploadResult> => {
  const formData = new FormData();
  const updatedFilenames: string[] = [];

  for (const photo of photos) {
    const file = previewImages.get(photo.filename);

    if (!file) {
      throw new Error(`File not found for ${photo.filename}`);
    }

    // Generate final filename with actual project ID
    const finalFilename = generateImageFilename(file.name, actualProjectId);

    updatedFilenames.push(finalFilename);

    formData.append("files", file, finalFilename.substring(1)); // Remove leading slash for form data
    formData.append(
      "metadata",
      JSON.stringify({
        originalFilename: photo.filename,
        category: photo.category,
        description: photo.description,
        finalFilename,
      }),
    );
  }

  try {
    const response = await fetch("/api/upload-project-photos", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Upload failed");
    }

    const result = await response.json();

    // Clean up preview URLs and stored files
    photos.forEach((photo) => {
      URL.revokeObjectURL(photo.url);
      previewImages.delete(photo.filename);
    });

    return {
      urls: result.urls,
      filenames: updatedFilenames,
      errors: [],
    };
  } catch (error) {
    return {
      urls: [],
      filenames: [],
      errors: [error instanceof Error ? error.message : "Upload failed"],
    };
  }
};

export const cleanupPreviewImages = (photos: ProjectPhoto[]) => {
  photos.forEach((photo) => {
    URL.revokeObjectURL(photo.url);
    previewImages.delete(photo.filename);
  });
};
