import z from "zod";

import { StepConfig } from "../_context/project-registration-provider";
import GetStartedComponent from "../_steps/get-started";
import { OrganizationType } from "../_steps/organization-type";
import { Documentation } from "../_steps/documentation";
import { LocationDetails } from "../_steps/location-details";
import { OrganizationDetails } from "../_steps/organization-details";
import { ProjectBasics } from "../_steps/project-basics";
import { ProjectMetrics } from "../_steps/project-matrix";
import { PhotoUpload } from "../_steps/photo-upload";

export const createProjectRegistrationSteps = (): StepConfig[] => [
  {
    id: "welcome",
    title: "Register Your Blue Carbon Project",
    subtitle: "Help restore coastal ecosystems and earn carbon credits",
    component: GetStartedComponent,
    isWelcomeStep: true,
    showProgress: false,
    customLayout: true,
  },
  {
    id: "organization-type",
    title: "Organization Type",
    subtitle: "Tell us about your organization",
    component: OrganizationType,
    validationFields: ["organizationType"],
  },
  {
    id: "organization-details",
    title: "Organization Details",
    subtitle: "Provide your organization information",
    component: OrganizationDetails,
    validationFields: ["organizationName", "contactPerson", "email", "phone"],
  },
  {
    id: "project-basics",
    title: "Project Information",
    subtitle: "Basic details about your project",
    component: ProjectBasics,
    validationFields: ["projectName", "projectDescription", "projectType"],
  },
  {
    id: "location-details",
    title: "Project Location",
    subtitle: "Where is your project located?",
    component: LocationDetails,
    validationFields: ["state", "district", "village"],
  },
  {
    id: "photo-upload",
    title: "Project Photos",
    subtitle: "Upload photos to document your project site and plans",
    component: PhotoUpload,
    validationFields: ["projectPhotos"],
    showProgress: true,
    customLayout: false,
  },
  {
    id: "project-metrics",
    title: "Project Metrics",
    subtitle: "Technical details and estimates",
    component: ProjectMetrics,
    validationFields: ["totalArea", "estimatedCreditsPerYear"],
  },
  {
    id: "documentation",
    title: "Documentation & Permissions",
    subtitle: "Legal requirements and clearances",
    component: Documentation,
    validationFields: ["hasLegalPermission"],
  },
];

export const defaultValues: ProjectRegistrationFormData = {
  // Organization Details
  organizationType: "ngo",
  organizationName: "My Organization",
  registrationNumber: "",
  contactPerson: "Raj Patel",
  email: "abc@example.com",
  phone: "1234567890",

  // Project Details
  projectName: "Project name",
  projectDescription: "Project description".repeat(10),
  projectType: "mangrove",

  // Location Details
  state: "kerala",
  district: "My district",
  village: "My village",
  coordinates: {
    lat: 0,
    lng: 0,
  },

  projectPhotos: [],

  // Project Metrics
  totalArea: 0.1,
  estimatedCreditsPerYear: 1,

  // Supporting Documents
  hasLegalPermission: false,
  hasSurveyReport: false,
  hasEnvironmentalClearance: false,
};

export const ProjectRegistrationSchema = z.object({
  // Organization Details
  organizationType: z.enum(["ngo", "panchayat", "community", "company"]),
  organizationName: z.string().min(2, "Organization name required"),
  registrationNumber: z.string().optional(),
  contactPerson: z.string().min(2, "Contact person name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),

  // Project Details
  projectName: z.string().min(5, "Project name must be at least 5 characters"),
  projectDescription: z.string().min(50, "Please provide detailed description"),
  projectType: z.enum([
    "mangrove",
    "seagrass",
    "salt_marsh",
    "coral_reef",
    "kelp_forest",
  ]),

  // Location Details
  state: z.string().min(1, "Please select state"),
  district: z.string().min(1, "Please select district"),
  village: z.string().min(1, "Village/area name required"),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),

  projectPhotos: z
    .array(
      z.object({
        id: z.string(),
        filename: z.string(),
        category: z.enum(["site-current", "site-reference", "documentation"]),
        description: z.string().optional(),
        url: z.string().url(),
        size: z.number(),
        uploadDate: z.string(),
      }),
    )
    .min(3, "Please upload at least 3 photos")
    .max(12, "Maximum 12 photos allowed")
    .refine(
      (photos) => {
        const currentSite = photos.filter((p) => p.category === "site-current");

        return currentSite.length >= 2;
      },
      {
        message: "At least 2 current site photos are required",
      },
    ),

  // Project Metrics
  totalArea: z.number().min(0.1, "Area must be at least 0.1 hectares"),
  estimatedCreditsPerYear: z.number().min(1, "Estimated credits required"),

  // Supporting Documents
  hasLegalPermission: z.boolean().refine((val: boolean) => val === true, {
    message: "You must confirm you have legal permission to run the project",
  }),
  hasSurveyReport: z.boolean(),
  hasEnvironmentalClearance: z.boolean(),
});

export type ProjectRegistrationFormData = z.infer<
  typeof ProjectRegistrationSchema
>;

// Helper functions for step management
export const getStepById = (
  steps: StepConfig[],
  id: string,
): StepConfig | undefined => {
  return steps.find((step) => step.id === id);
};

export const getStepIndex = (steps: StepConfig[], id: string): number => {
  return steps.findIndex((step) => step.id === id);
};

export const isWelcomeStep = (step: StepConfig): boolean => {
  return step.isWelcomeStep === true;
};

export const shouldShowProgress = (step: StepConfig): boolean => {
  return step.showProgress !== false && !step.isWelcomeStep;
};

export const hasCustomLayout = (step: StepConfig): boolean => {
  return step.customLayout === true;
};

export const canNavigateToStep = (
  steps: StepConfig[],
  fromIndex: number,
  toIndex: number,
): boolean => {
  // Can always go backwards
  if (toIndex < fromIndex) return true;

  // Can't skip steps forward
  if (toIndex > fromIndex + 1) return false;

  // Check if current step is valid before moving forward
  const currentStep = steps[fromIndex];

  if (
    !currentStep.validationFields ||
    currentStep.validationFields.length === 0
  ) {
    return true;
  }

  // This would need to be implemented with actual validation logic
  return true;
};

export const getProgressPercentage = (
  currentIndex: number,
  totalSteps: number,
): number => {
  return Math.round(((currentIndex + 1) / totalSteps) * 100);
};

export const getNextStepPreview = (
  steps: StepConfig[],
  currentIndex: number,
): StepConfig | null => {
  if (currentIndex < steps.length - 1) {
    return steps[currentIndex + 1];
  }

  return null;
};

export const getPreviousStepPreview = (
  steps: StepConfig[],
  currentIndex: number,
): StepConfig | null => {
  if (currentIndex > 0) {
    return steps[currentIndex - 1];
  }

  return null;
};

// Validation helpers
export const getRequiredFieldsForStep = (step: StepConfig): string[] => {
  return step.validationFields || [];
};

export const getStepsWithValidation = (steps: StepConfig[]): StepConfig[] => {
  return steps.filter(
    (step) => step.validationFields && step.validationFields.length > 0,
  );
};

export const getTotalValidationSteps = (steps: StepConfig[]): number => {
  return getStepsWithValidation(steps).length;
};
