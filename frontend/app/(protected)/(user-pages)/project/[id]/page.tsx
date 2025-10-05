"use client";
import React, { useState, useEffect, use } from "react";
import {
  TreePine,
  MapPin,
  Coins,
  CheckCircle,
  Image,
  Clock,
  XCircle,
  FileText,
  Download,
  Eye,
  Edit,
  AlertCircle,
  Shield,
  Activity,
  Leaf,
  Fish,
  Sprout,
  Waves,
  Map,
  Navigation,
  Calendar,
  Users,
  Building,
  Phone,
  Mail,
  Globe,
  Target,
  Camera,
  X,
  ZoomIn,
  FolderOpen,
} from "lucide-react";

import { ProjectType, ProjectStatus, Project, ProjectPhoto } from "@/types";
import { PageLoader } from "@/components/ui/reusable-components";

// TypeScript interfaces
interface Coordinates {
  lat: number;
  lng: number;
}

interface ProjectMapProps {
  coordinates: Coordinates;
  projectName: string;
  projectType: string;
}

interface TimelineItem {
  status: string;
  date: Date | null;
  completed: boolean;
  icon: React.ReactElement;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement;
}

// Extend Window interface for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

// Mock project data
const mockProject: Project = {
  id: "PROJ-2024-001",
  projectName: "Sundarbans Mangrove Restoration",
  organizationName: "Green Earth Foundation",
  organizationType: "NGO",
  contactPerson: "Dr. Rajesh Kumar",
  email: "rajesh@greenearth.org",
  phone: "+91-9876543210",
  registrationNumber: "NGO/WB/2020/12345",
  projectDescription:
    "A comprehensive mangrove restoration project aimed at restoring 500 hectares of degraded mangrove ecosystems in the Sundarbans region. This project will focus on native species plantation, community engagement, and long-term monitoring to ensure sustainable carbon sequestration and biodiversity conservation.",
  projectType: "MANGROVE",
  totalArea: 500,
  estimatedCreditsPerYear: 2500,
  state: "West Bengal",
  district: "South 24 Parganas",
  village: "Gosaba",
  coordinates: { lat: 22.1667, lng: 88.8 },
  status: "APPROVED",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-03-20"),
  contractAddress: "0x742d35Cc6634C0532925a3b8D",
  tokenId: "12345",
  totalCreditsGenerated: 7500,
  hasSurveyReport: true,
  hasEnvironmentalClearance: true,
  projectPhotos: [
    {
      id: "a915218c-7ffa-45fb-a3fb-1d2da254085f",
      filename: "/PROJECT_ID-Untitled-diagram---M-1758768996397.png",
      category: "site-current",
      description: "Current site conditions showing mangrove area",
      url: "/uploads/PROJECT_ID-Untitled-diagram---M-1758768996397.png",
      size: 163196,
      uploadDate: "2025-09-25T02:56:20.674Z",
    },
    {
      id: "3927d8e8-1640-45b0-9c07-0551882bcf6e",
      filename: "/PROJECT_ID-WhatsApp-Image-2025--1758768996397.png",
      category: "site-current",
      description: "Aerial view of project site",
      url: "/uploads/PROJECT_ID-WhatsApp-Image-2025--1758768996397.png",
      size: 163902,
      uploadDate: "2025-09-25T02:56:20.762Z",
    },
    {
      id: "13d015e2-25a1-4f02-ae0f-a0279e1f0a82",
      filename: "/PROJECT_ID-image-removebg-previ-1758768996397.png",
      category: "site-reference",
      description: "Reference image for restoration planning",
      url: "/uploads/PROJECT_ID-image-removebg-previ-1758768996397.png",
      size: 27901,
      uploadDate: "2025-09-25T02:56:20.918Z",
    },
    {
      id: "ae2c8142-a6de-4460-9af9-e4b871266f8a",
      filename: "/PROJECT_ID-WhatsApp-Image-2025--1758768996397.png",
      category: "documentation",
      description: "Survey documentation and permits",
      url: "/uploads/PROJECT_ID-WhatsApp-Image-2025--1758768996397.png",
      size: 119545,
      uploadDate: "2025-09-25T02:56:20.963Z",
    },
  ],
  hasLegalPermits: false,
};

// Leaflet Map Component
const ProjectMap: React.FC<ProjectMapProps> = ({
  coordinates,
  projectName,
  projectType,
}) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!mapContainer || map) return;

    // Load Leaflet if not already loaded
    const loadLeaflet = async () => {
      if (typeof window !== "undefined" && !window.L) {
        // Load CSS
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        // Load JS
        const script = document.createElement("script");

        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;

        return new Promise((resolve) => {
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
    };

    const initMap = async () => {
      await loadLeaflet();

      if (!window.L) return;

      const L = window.L;
      const mapInstance = L.map(mapContainer, {
        center: [coordinates.lat, coordinates.lng],
        zoom: 13,
        zoomControl: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      // Add marker
      L.marker([coordinates.lat, coordinates.lng]).addTo(mapInstance)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${projectName}</h3>
            <p class="text-xs text-gray-600 capitalize">${projectType} Project</p>
          </div>
        `);

      // Add circle to show project area (approximate)
      L.circle([coordinates.lat, coordinates.lng], {
        color: "#16a34a",
        fillColor: "#16a34a",
        fillOpacity: 0.1,
        radius: 2000, // 2km radius as example
      }).addTo(mapInstance);

      setMap(mapInstance);
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [mapContainer, coordinates, projectName, projectType]);

  return (
    <div className="relative">
      <div
        ref={setMapContainer}
        className="w-full overflow-hidden border-2 border-gray-100 shadow-lg h-80 rounded-xl dark:border-gray-700"
      />
      <div className="absolute px-3 py-2 bg-white rounded-lg shadow-md top-4 left-4 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium">Project Location</span>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getProgress = (status: ProjectStatus): number => {
  const progressMap: Record<ProjectStatus, number> = {
    REJECTED: 0,
    PENDING: 25,
    APPROVED: 75,
    ACTIVE: 85,
    COMPLETED: 100,
  };

  return progressMap[status] || 0;
};

const getStatusColor = (status: ProjectStatus): string => {
  const colors: Record<ProjectStatus, string> = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200",
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    REJECTED: "bg-red-100 text-red-800 border-red-200",
    ACTIVE: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-purple-100 text-purple-800 border-purple-200",
  };

  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

const getStatusIcon = (status: ProjectStatus): React.ReactElement => {
  const icons: Record<ProjectStatus, React.ReactElement> = {
    PENDING: <Clock className="w-4 h-4" />,
    APPROVED: <CheckCircle className="w-4 h-4" />,
    REJECTED: <XCircle className="w-4 h-4" />,
    ACTIVE: <Activity className="w-4 h-4" />,
    COMPLETED: <CheckCircle className="w-4 h-4" />,
  };

  return icons[status] || <AlertCircle className="w-4 h-4" />;
};

const getProjectTypeIcon = (type: ProjectType): React.ReactElement => {
  const icons: Record<ProjectType, React.ReactElement> = {
    MANGROVE: <TreePine className="w-6 h-6" />,
    SEAGRASS: <Sprout className="w-6 h-6" />,
    SALT_MARSH: <Waves className="w-6 h-6" />,
    CORAL_REEF: <Fish className="w-6 h-6" />,
    KELP_FOREST: <Leaf className="w-6 h-6" />,
  };

  return icons[type] || <Map className="w-6 h-6" />;
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ProjectStatusPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [userRole] = useState<string>("admin");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedImage, setSelectedImage] = useState<ProjectPhoto | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const projects: Project[] = JSON.parse(
      localStorage.getItem("projects") || "[]",
    );
    // const project = projects.filter((p) => p.id === id)[0];
    // ID does not exist rn, just show n-1 index

    // Validate if exists

    const project = projects[Number(id) - 1] || null;

    setProject(project);
    setIsLoading(false);
  }, []);

  const isAdmin = userRole === "admin";

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        Project not found
      </div>
    );
  }

  const timeline: TimelineItem[] = [
    {
      status: "Application Submitted",
      date: project.createdAt,
      completed: true,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      status: "Under Review",
      date: project.updatedAt,
      completed: project.status !== "PENDING",
      icon: <Eye className="w-5 h-5" />,
    },
    {
      status: "Project Approved",
      date: project.status === "APPROVED" ? project.updatedAt : null,
      completed: ["APPROVED", "ACTIVE", "COMPLETED"].includes(project.status),
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      status: "Credits Generated",
      date: null,
      completed: project.status === "COMPLETED",
      icon: <Coins className="w-5 h-5" />,
    },
  ];

  const ImageModal: React.FC = () => {
    if (!showImageModal || !selectedImage) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {selectedImage.category.replace("-", " ").toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedImage.description || "No description available"}
              </p>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowImageModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={selectedImage.filename}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              src={selectedImage.url}
            // TODO: fix it with URL from backend
            />
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Size: {(selectedImage.size / 1024).toFixed(1)} KB</span>
              <span>
                Uploaded:{" "}
                {new Date(selectedImage.uploadDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6. Add photos tab to the tabs array
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "organization",
      label: "Organization",
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: "photos",
      label: "Photos",
      icon: <Camera className="w-4 h-4" />,
    },
    ...(project.status === "APPROVED"
      ? [
        {
          id: "blockchain",
          label: "Blockchain",
          icon: <Shield className="w-4 h-4" />,
        },
      ]
      : []),
    ...(isAdmin
      ? [
        {
          id: "admin",
          label: "Admin Notes",
          icon: <Users className="w-4 h-4" />,
        },
      ]
      : []),
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Project Description */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <Target className="w-5 h-5 text-emerald-600" />
                Project Description
              </h4>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {project.projectDescription}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 border bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl border-emerald-200 dark:border-emerald-800">
                <TreePine className="w-8 h-8 mb-4 text-emerald-600" />
                <p className="mb-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Project Type
                </p>
                <p className="text-2xl font-bold capitalize text-emerald-900 dark:text-emerald-300">
                  {project.projectType}
                </p>
              </div>
              <div className="p-6 border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl dark:border-blue-800">
                <MapPin className="w-8 h-8 mb-4 text-blue-600" />
                <p className="mb-1 text-sm font-medium text-blue-700 dark:text-blue-400">
                  Total Area
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  {project.totalArea} <span className="text-lg">ha</span>
                </p>
              </div>
              <div className="p-6 border bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl border-amber-200 dark:border-amber-800">
                <Coins className="w-8 h-8 mb-4 text-amber-600" />
                <p className="mb-1 text-sm font-medium text-amber-700 dark:text-amber-400">
                  Credits/Year
                </p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-300">
                  {project.estimatedCreditsPerYear}
                </p>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <Navigation className="w-5 h-5 text-emerald-600" />
                Location Details
              </h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { label: "State", value: project.state },
                  { label: "District", value: project.district },
                  { label: "Village", value: project.village },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {item.label}:
                    </span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "organization":
        return (
          <div className="space-y-8">
            <h4 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <Building className="w-5 h-5 text-emerald-600" />
              Organization Information
            </h4>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { label: "Organization", value: project.organizationName },
                {
                  label: "Type",
                  value: project.organizationType
                    .replace("_", " ")
                    .toUpperCase(),
                },
                { label: "Contact Person", value: project.contactPerson },
                { label: "Registration", value: project.registrationNumber },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <span className="text-sm font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                    {item.label}
                  </span>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h5 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  <Shield className="w-4 h-4 text-amber-600" />
                  Contact Information (Admin Only)
                </h5>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-6 border bg-amber-50 dark:bg-amber-900/20 rounded-xl border-amber-200 dark:border-amber-800">
                    <Mail className="w-5 h-5 mb-2 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      Email
                    </span>
                    <p className="text-lg font-semibold text-amber-900 dark:text-amber-300">
                      {project.email}
                    </p>
                  </div>
                  <div className="p-6 border bg-amber-50 dark:bg-amber-900/20 rounded-xl border-amber-200 dark:border-amber-800">
                    <Phone className="w-5 h-5 mb-2 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      Phone
                    </span>
                    <p className="text-lg font-semibold text-amber-900 dark:text-amber-300">
                      {project.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "blockchain":
        if (project.status === "APPROVED") {
          return (
            <div className="space-y-8">
              <div className="p-8 text-center border-2 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border-emerald-200 dark:border-emerald-800">
                <Shield className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
                <h4 className="mb-2 text-2xl font-bold text-emerald-900 dark:text-emerald-300">
                  Blockchain Verified
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  This project has been registered on the blockchain for
                  transparency and immutability.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Contract Address", value: project.contractAddress },
                  { label: "Token ID", value: project.tokenId },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <span className="text-sm font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                      {item.label}
                    </span>
                    <p className="p-3 mt-2 font-mono text-lg bg-white border rounded-lg dark:bg-gray-900">
                      {item.value}
                    </p>
                  </div>
                ))}

                <div className="p-6 border bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Coins className="w-6 h-6 text-emerald-600" />
                    <span className="text-sm font-medium tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
                      Total Credits Generated
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-emerald-800 dark:text-emerald-300">
                      {project.totalCreditsGenerated}
                    </span>
                    <span className="text-lg text-emerald-700 dark:text-emerald-400">
                      tons CO₂e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return null;

      case "photos":
        return (
          <div className="space-y-8">
            <h4 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <Camera className="w-5 h-5 text-emerald-600" />
              Project Photos
            </h4>

            {project.projectPhotos.length === 0 ? (
              <div className="p-8 text-center border-2 border-gray-300 border-dashed dark:border-gray-600 rounded-xl">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  No photos available for this project
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Group photos by category */}
                {["site-current", "site-reference", "documentation"].map(
                  (category) => {
                    const categoryPhotos = project.projectPhotos.filter(
                      (photo) => photo.category === category,
                    );

                    if (categoryPhotos.length === 0) return null;

                    return (
                      <div key={category} className="space-y-4">
                        <h5 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                          <Image className="w-5 h-5 text-emerald-600" />
                          {category.replace("-", " ").toUpperCase()} (
                          {categoryPhotos.length})
                        </h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {categoryPhotos.map((photo) => (
                            <div
                              key={photo.id}
                              aria-label={photo.description || "Project photo"}
                              className="relative overflow-hidden bg-gray-100 cursor-pointer group rounded-xl dark:bg-gray-800"
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setSelectedImage(photo);
                                setShowImageModal(true);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setSelectedImage(photo);
                                  setShowImageModal(true);
                                }
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                alt={photo.filename || "Project photo"}
                                className="object-cover w-full h-48 transition-transform group-hover:scale-105"
                                src={photo.url}
                              />
                              {/* TODO: fix url */}
                              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100">
                                <div className="absolute bottom-4 left-4 right-4">
                                  <p className="text-sm font-medium text-white truncate">
                                    {photo.description || "No description"}
                                  </p>
                                  <p className="text-xs text-white/80">
                                    {(photo.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                                <div className="absolute top-4 right-4">
                                  <ZoomIn className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
        );

      case "admin":
        if (isAdmin) {
          return (
            <div className="space-y-8">
              <div className="p-6 border bg-amber-50 dark:bg-amber-900/20 rounded-xl border-amber-200 dark:border-amber-800">
                <h4 className="flex items-center gap-2 mb-2 font-bold text-amber-800 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  Admin Only Section
                </h4>
                <p className="text-amber-700 dark:text-amber-400">
                  This information is only visible to NCCR administrators.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-sm font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                    Admin Notes
                  </span>
                  <div className="p-6 mt-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-gray-900 dark:text-white">
                      {project.adminNotes || "No admin notes available."}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                    Verification Notes
                  </span>
                  <div className="p-6 mt-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-gray-900 dark:text-white">
                      {project.verificationNotes ||
                        "No verification notes available."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-sm font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                      Submitted
                    </span>
                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDate(project.createdAt)}
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-sm font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                      Last Updated
                    </span>
                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDate(project.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return null;

      default:
        return null;
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl dark:border-gray-700">
        <div className="px-6 py-8 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-6">
              <div className="p-4 shadow-xl rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600">
                {getProjectTypeIcon(project.projectType)}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl dark:text-white">
                  {project.projectName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Project ID:</span>
                    <span className="px-2 py-1 font-mono bg-gray-100 rounded dark:bg-gray-800">
                      {project.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{project.organizationName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Since {formatDate(project.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`px-4 py-3 rounded-xl border-2 font-semibold flex items-center gap-2 ${getStatusColor(project.status)}`}
              >
                {getStatusIcon(project.status)}
                {project.status}
                {/* {project.status.replace("_", " ")} */}
              </div>
              {isAdmin && (
                <button className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 rounded-xl">
                  <Edit className="w-4 h-4" />
                  Edit Status
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 mx-auto space-y-8 max-w-7xl lg:px-8">
        {/* Enhanced Progress Section */}
        <div className="p-8 border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Project Progress
            </h3>
            <div className="text-right">
              <span className="text-3xl font-bold text-emerald-600">
                {getProgress(project.status)}%
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-3 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600"
                style={{ width: `${getProgress(project.status)}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all ${item.completed
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                    : "bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400"
                  }`}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <p className="mb-2 text-sm font-semibold text-center">
                  {item.status}
                </p>
                {item.date && (
                  <p className="text-xs text-center opacity-80">
                    {formatDate(item.date)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          {/* Project Details - Takes 3 columns */}
          <div className="space-y-8 xl:col-span-3">
            {/* Map Section */}
            <div className="p-8 border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  Project Location
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span>
                    {project.coordinates.lat}, {project.coordinates.lng}
                  </span>
                </div>
              </div>
              <ProjectMap
                coordinates={project.coordinates}
                projectName={project.projectName}
                projectType={project.projectType}
              />
            </div>

            {/* Tabbed Content */}
            <div className="border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
              {/* Tab Navigation */}
              <div className="p-6 pb-0 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                          ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                        }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">{renderTabContent()}</div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 xl:col-span-1">
            {/* Status Summary Card */}
            <div className="p-6 border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Status Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Current Status
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {getProgress(project.status)}%
                  </span>
                </div>
              </div>
            </div>
            {/* Project Stats Card */}
            <div className="p-6 border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Project Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Area
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {project.totalArea} ha
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Credits/Year
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {project.estimatedCreditsPerYear}
                  </span>
                </div>
                {project.totalCreditsGenerated > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Generated
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      {project.totalCreditsGenerated}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Documentation Status */}
            <div className="p-6 border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Documentation
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {project.hasSurveyReport ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Survey Report
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {project.hasEnvironmentalClearance ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Environmental Clearance
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {project.hasLegalPermits ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Legal Permission
                  </span>
                </div>
                {project.projectPhotos && project.projectPhotos.length > 0 && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Project Photos ({project.projectPhotos.length})
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="p-6 border border-gray-200 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl dark:border-gray-700">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                <button className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {isAdmin && (
                  <button className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700">
                    <Edit className="w-4 h-4" />
                    Edit Project
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal />
    </div>
  );
};

export default ProjectStatusPage;
