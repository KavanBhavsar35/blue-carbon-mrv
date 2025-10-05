"use client";

import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Alert } from "@heroui/alert";
import { addToast } from "@heroui/toast";
import {
  Camera,
  Upload,
  FileImage,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ImageIcon,
  X,
} from "lucide-react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import {
  ProjectPhoto,
  storePreviewImage,
  cleanupPreviewImages,
} from "@/utils/image";

interface PhotoUploadProps {}

const MAX_PHOTOS = 7;

export const PhotoUpload: React.FC<PhotoUploadProps> = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const photos: ProjectPhoto[] = watch("projectPhotos") || [];

  const photoCategories = [
    {
      id: "site-current",
      title: "Current Site Condition",
      description: "Photos showing the present state of your project area",
      recommended: 3,
      examples: [
        "Wide area view",
        "Close-up vegetation",
        "Water/soil conditions",
      ],
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: "site-reference",
      title: "Reference Photos",
      description:
        "Historical photos or nearby healthy ecosystem for comparison",
      recommended: 2,
      examples: [
        "Historical site photos",
        "Healthy reference ecosystem",
        "Before restoration images",
      ],
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "documentation",
      title: "Supporting Documentation",
      description:
        "Permits, surveys, team photos, or other relevant documentation",
      recommended: 2,
      examples: [
        "Survey maps",
        "Team at work",
        "Legal documents",
        "Equipment photos",
      ],
      icon: <FileImage className="w-4 h-4" />,
    },
  ];

  const handleFileSelect = useCallback(
    async (files: FileList | File[]) => {
      if (!files || files.length === 0) return;

      const currentPhotoCount = photos.length;
      const fileArray = Array.from(files);
      const availableSlots = MAX_PHOTOS - currentPhotoCount;

      // Check if adding these files would exceed the limit
      if (availableSlots <= 0) {
        addToast({
          title: "Upload Limit Reached",
          description: `You can only upload a maximum of ${MAX_PHOTOS} photos. Please remove some photos before adding new ones.`,
          color: "danger",
        });

        return;
      }

      // If user tries to upload more than available slots, take only what fits
      let filesToProcess = fileArray;
      let droppedCount = 0;

      if (fileArray.length > availableSlots) {
        filesToProcess = fileArray.slice(0, availableSlots);
        droppedCount = fileArray.length - availableSlots;
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        const totalFiles = filesToProcess.length;

        // Create preview images (no actual upload yet)
        for (let i = 0; i < filesToProcess.length; i++) {
          setUploadProgress(((i + 1) / totalFiles) * 100);
          // Small delay for visual feedback
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        const newPhotos = await storePreviewImage(filesToProcess);

        setValue("projectPhotos", [...photos, ...newPhotos]);

        // Success toast
        if (droppedCount > 0) {
          addToast({
            title: "Photos Added with Limit Reached",
            description: `${filesToProcess.length} photos added successfully. ${droppedCount} photos were dropped as the maximum limit of ${MAX_PHOTOS} photos has been reached.`,
            color: "warning",
          });
        } else {
          addToast({
            title: "Photos Added Successfully",
            description: `${filesToProcess.length} photo${filesToProcess.length > 1 ? "s" : ""} added successfully.`,
            color: "success",
          });
        }
      } catch (error: any) {
        console.error("Preview error:", error);
        addToast({
          title: "Upload Error",
          description:
            error.toString() || "Failed to process photos. Please try again.",
          color: "danger",
        });
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [photos, setValue],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      if (e.dataTransfer.files) {
        handleFileSelect(e.dataTransfer.files);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const removePhoto = (photoId: string) => {
    const photoToRemove = photos.find((p) => p.id === photoId);

    if (photoToRemove) {
      // Clean up preview URL
      URL.revokeObjectURL(photoToRemove.url);

      addToast({
        title: "Photo Removed",
        description: `${photoToRemove.filename} has been removed.`,
        color: "default",
      });
    }

    setValue(
      "projectPhotos",
      photos.filter((p) => p.id !== photoId),
    );
  };

  const updatePhotoCategory = (photoId: string, category: string) => {
    setValue(
      "projectPhotos",
      photos.map((p) => (p.id === photoId ? { ...p, category } : p)),
    );
  };

  const updatePhotoDescription = (photoId: string, description: string) => {
    setValue(
      "projectPhotos",
      photos.map((p) => (p.id === photoId ? { ...p, description } : p)),
    );
  };

  const getPhotosInCategory = (categoryId: string) => {
    return photos.filter((p) => p.category === categoryId);
  };

  const getTotalPhotos = () => photos.length;
  const getRecommendedTotal = () =>
    photoCategories.reduce((sum, cat) => sum + cat.recommended, 0);

  const isUploadDisabled = getTotalPhotos() >= MAX_PHOTOS;

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      cleanupPreviewImages(photos);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isUploadDisabled
            ? "border-divider/50 bg-content2/50"
            : dragActive
              ? "border-primary bg-primary/5"
              : "border-divider hover:border-primary/50"
        }`}
      >
        <CardBody
          className={`p-8 text-center ${
            isUploadDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          onClick={() => {
            if (isUploadDisabled) {
              addToast({
                title: "Upload Limit Reached",
                description: `You can only upload a maximum of ${MAX_PHOTOS} photos. Please remove some photos before adding new ones.`,
                color: "danger",
              });

              return;
            }

            const input = document.createElement("input");

            input.type = "file";
            input.multiple = true;
            input.accept = "image/*";
            input.onchange = (e) => {
              const target = e.target as HTMLInputElement;

              if (target.files) {
                handleFileSelect(target.files);
              }
            };
            input.click();
          }}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="p-4 mb-4 rounded-full bg-primary/10">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              Upload Project Photos
            </h3>
            <p className="mb-4 text-sm text-foreground/70">
              {isUploadDisabled
                ? `Maximum ${MAX_PHOTOS} photos reached`
                : "Drag and drop photos here, or click to browse"}
            </p>
            <div className="text-xs text-foreground/60">
              Supports: JPG, PNG, WebP • Max 5MB per file • Limit:{" "}
              {getTotalPhotos()}/{MAX_PHOTOS} photos
            </div>
            <div className="mt-2 text-xs text-foreground/50">
              Images will be uploaded when you submit the form
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-primary animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Processing photos...
                  </span>
                  <span className="text-xs text-foreground/70">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
                <Progress
                  aria-labelledby="upload-progress"
                  color="primary"
                  size="sm"
                  value={uploadProgress}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Photo Limit Warning */}
      {getTotalPhotos() >= MAX_PHOTOS - 1 && (
        <Alert
          color={getTotalPhotos() >= MAX_PHOTOS ? "danger" : "warning"}
          description={
            getTotalPhotos() >= MAX_PHOTOS
              ? `You have reached the maximum limit of ${MAX_PHOTOS} photos. Remove some photos to add new ones.`
              : `You are approaching the maximum limit of ${MAX_PHOTOS} photos. You can add ${MAX_PHOTOS - getTotalPhotos()} more photo${MAX_PHOTOS - getTotalPhotos() > 1 ? "s" : ""}.`
          }
          title={
            getTotalPhotos() >= MAX_PHOTOS
              ? "Photo Limit Reached"
              : "Approaching Photo Limit"
          }
          variant="flat"
        />
      )}

      {/* Photo Categories */}
      <div className="space-y-6">
        {photoCategories.map((category) => {
          const categoryPhotos = getPhotosInCategory(category.id);
          const hasMinimum = categoryPhotos.length >= category.recommended - 1; // Allow 1 less than recommended

          return (
            <Card
              key={category.id}
              className={`border ${
                hasMinimum
                  ? "border-success/30 bg-success/5"
                  : "border-warning/30 bg-warning/5"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        hasMinimum
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-foreground/70">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Chip
                      color={hasMinimum ? "success" : "warning"}
                      size="sm"
                      variant="flat"
                    >
                      {categoryPhotos.length}/{category.recommended}
                    </Chip>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                {/* Examples */}
                <div className="mb-4">
                  <p className="mb-2 text-xs text-foreground/60">
                    Recommended photos:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.examples.map((example, idx) => (
                      <Chip key={idx} color="default" size="sm" variant="flat">
                        {example}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Photos in this category */}
                {categoryPhotos.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryPhotos.map((photo: any) => (
                      <Card key={photo.id} className="border border-divider/50">
                        <CardBody className="p-3">
                          <div className="relative mb-3 overflow-hidden rounded-lg aspect-video bg-content2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt={photo.filename}
                              className="object-cover w-full h-full"
                              src={photo.url}
                            />
                            <div className="absolute flex gap-1 top-2 right-2">
                              <Button
                                isIconOnly
                                className="text-white bg-black/50"
                                color="danger"
                                size="sm"
                                variant="flat"
                                onPress={() => removePhoto(photo.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-medium truncate">
                              {photo.filename}
                            </p>
                            <Input
                              className="w-full text-xs bg-transparent rounded"
                              placeholder="Add description..."
                              radius="lg"
                              type="text"
                              value={photo.description || ""}
                              variant="flat"
                              onChange={(e) =>
                                updatePhotoDescription(photo.id, e.target.value)
                              }
                            />
                            <div className="flex justify-between gap-2 text-xs text-foreground/60">
                              <Chip
                                color={
                                  Math.round(photo.size / 1024) < 1000
                                    ? "success"
                                    : "warning"
                                }
                                variant="flat"
                              >
                                {Math.round(photo.size / 1024)}KB
                              </Chip>
                              <Select
                                aria-label="Photo Category"
                                className="text-xs bg-transparent border-none outline-none "
                                classNames={{
                                  // Trigger wrapper
                                  trigger:
                                    "w-full flex justify-between items-center",

                                  // Only the value inside trigger should be truncated
                                  value: "max-w-32 truncate",

                                  // Popover content should be auto width based on content
                                  popoverContent: "w-auto",
                                  listboxWrapper: "w-auto",
                                }}
                                defaultSelectedKeys={[photo.category]}
                                placeholder="Category"
                                radius="lg"
                                selectedKeys={
                                  photo.category ? [photo.category] : []
                                }
                                size="sm"
                                onChange={(e) =>
                                  updatePhotoCategory(photo.id, e.target.value)
                                }
                              >
                                {photoCategories.map((cat) => (
                                  <SelectItem key={cat.id}>
                                    {cat.title}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-foreground/50">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No photos in this category yet</p>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="border bg-gradient-to-r from-primary/5 to-success/5 border-primary/20">
        <CardBody className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getTotalPhotos() >= getRecommendedTotal() - 1 ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <AlertCircle className="w-5 h-5 text-warning" />
              )}
              <div>
                <h3 className="font-semibold">Photo Upload Summary</h3>
                <p className="text-sm text-foreground/70">
                  {getTotalPhotos()} of {MAX_PHOTOS} maximum photos •{" "}
                  {getRecommendedTotal()} recommended
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-1 text-sm font-medium">
                {getTotalPhotos()}/{MAX_PHOTOS}
              </div>
              <Progress
                aria-label="Upload progress"
                className="w-24"
                color={
                  getTotalPhotos() >= MAX_PHOTOS
                    ? "danger"
                    : getTotalPhotos() >= getRecommendedTotal() - 1
                      ? "success"
                      : "primary"
                }
                value={(getTotalPhotos() / MAX_PHOTOS) * 100}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Guidelines */}
      <Card className="border bg-info/10 border-info/30">
        <CardBody className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-2 font-semibold text-info">Photo Guidelines</h3>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• Maximum {MAX_PHOTOS} photos allowed per project</li>
                <li>• Images are stored locally until form submission</li>
                <li>• Take clear, well-lit photos during daylight hours</li>
                <li>
                  • Include GPS coordinates when possible (automatic if taken
                  with phone)
                </li>
                <li>• Show multiple angles of the project site</li>
                <li>
                  • Include reference objects for scale (people, tools, markers)
                </li>
                <li>• Avoid uploading sensitive or personal information</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Validation Error */}
      {errors.projectPhotos && (
        <Alert
          color="danger"
          description={errors.projectPhotos.message as string}
          title="Photo Upload Required"
          variant="flat"
        />
      )}
    </div>
  );
};
