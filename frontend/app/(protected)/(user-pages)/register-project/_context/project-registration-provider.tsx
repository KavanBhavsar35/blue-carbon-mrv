"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";

import {
  defaultValues,
  ProjectRegistrationFormData,
  ProjectRegistrationSchema,
} from "../_config/project-registration-config";
import { createProjectRegistrationSteps } from "../_config/project-registration-config";

import { uploadProjectImages } from "@/utils/image";
import { Project } from "@/types";

// Enhanced Zod Schema with better validations

// Step configuration interface
export interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  component: React.ComponentType<any>;
  validationFields?: (keyof ProjectRegistrationFormData)[];
  isWelcomeStep?: boolean; // For full-screen welcome steps
  showProgress?: boolean; // Whether to show progress bar
  customLayout?: boolean; // Whether step handles its own layout
}

interface ProjectRegistrationContextType {
  currentStepIndex: number;
  totalSteps: number;
  currentStep: StepConfig;
  steps: StepConfig[];
  setCurrentStep: (step: number) => void;
  next: () => void;
  prev: () => void;
  goToStep: (stepId: string) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  validateCurrentStep: () => Promise<boolean>;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  isValidating: boolean;
  getStepProgress: () => number;
  canNavigateBack: boolean;
  canNavigateForward: boolean;
}

const ProjectRegistrationContext = createContext<
  ProjectRegistrationContextType | undefined
>(undefined);

export const ProjectRegistrationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Create steps configuration
  const steps = useMemo(() => createProjectRegistrationSteps(), []);
  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex];

  const methods = useForm<ProjectRegistrationFormData>({
    resolver: zodResolver(ProjectRegistrationSchema),
    defaultValues,
    mode: "onChange", // Enable real-time validation
  });

  const {
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  // Computed properties
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;
  const canNavigateBack = !isFirstStep && !isSubmitting && !isValidating;
  const canNavigateForward = !isLastStep || !!currentStep.isWelcomeStep;

  // Get progress percentage
  const getStepProgress = useCallback(() => {
    return Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  }, [currentStepIndex, totalSteps]);

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const step = steps[currentStepIndex];

    if (
      step.isWelcomeStep ||
      !step.validationFields ||
      step.validationFields.length === 0
    ) {
      return true;
    }

    setIsValidating(true);

    try {
      const isValid = await trigger(step.validationFields);

      return isValid;
    } finally {
      setIsValidating(false);
    }
  }, [currentStepIndex, trigger, errors, steps]);

  // Navigate to specific step by ID
  const goToStep = useCallback(
    (stepId: string) => {
      const stepIndex = steps.findIndex((step) => step.id === stepId);

      if (stepIndex !== -1 && stepIndex !== currentStepIndex) {
        setCurrentStepIndex(stepIndex);
      }
    },
    [steps, currentStepIndex],
  );

  // Navigate forward
  const next = useCallback(async () => {
    if (currentStepIndex < totalSteps - 1) {
      const isValid = await validateCurrentStep();

      if (isValid) {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }
  }, [
    currentStepIndex,
    validateCurrentStep,
    getValues,
    totalSteps,
    currentStep,
    steps,
  ]);

  // Navigate backward
  const prev = useCallback(() => {
    currentStepIndex > 0 && setCurrentStepIndex((prev) => prev - 1);
  }, [currentStepIndex, currentStep, steps]);

  // Submit form
  const submitForm = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const isFormValid = await trigger();

      if (!isFormValid) {
        // handle errors...
        return;
      }

      const finalData = {
        ...getValues(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("📦 Form data before images:", finalData);
      // TODO: db sync
      // TODO: image path (remove from public)

      const projectsString = localStorage.getItem("projects");
      const projects: Project[] = JSON.parse(
        projectsString ? projectsString : "[]",
      );

      localStorage.setItem(
        "projects",
        JSON.stringify([...projects, finalData]),
      );

      // Upload project photos first
      if (finalData.projectPhotos && finalData.projectPhotos.length > 0) {
        const uploadResult = await uploadProjectImages(
          finalData.projectPhotos,
          "PROJECT_ID", // replace with actual project ID after creating project
        );

        if (uploadResult.errors.length > 0) {
          addToast({
            title: "Image Upload Error",
            description: uploadResult.errors.join(", "),
            color: "danger",
          });

          return;
        }

        // Replace preview photos with uploaded info
        finalData.projectPhotos = finalData.projectPhotos.map((photo, i) => ({
          ...photo,
          filename: uploadResult.filenames[i],
          url: uploadResult.urls[i],
          file: undefined, // remove File reference
        }));
      }

      console.log("📦 Final form data after image upload:", finalData);

      // Now submit the form with finalData to your API
      // await submitToAPI(finalData);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      addToast({
        title: "Submission Error",
        description:
          "There was an error submitting your form. Please try again.",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [trigger, getValues, errors]);

  const contextValue: ProjectRegistrationContextType = {
    currentStepIndex,
    totalSteps,
    currentStep,
    steps,
    setCurrentStep: setCurrentStepIndex,
    next,
    prev,
    goToStep,
    isLastStep,
    isFirstStep,
    validateCurrentStep,
    submitForm,
    isSubmitting,
    isValidating,
    getStepProgress,
    canNavigateBack,
    canNavigateForward,
  };

  return (
    <ProjectRegistrationContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ProjectRegistrationContext.Provider>
  );
};

export const useProjectRegistration = () => {
  const context = useContext(ProjectRegistrationContext);

  if (!context) {
    throw new Error(
      "useProjectRegistration must be used within a ProjectRegistrationProvider",
    );
  }

  return context;
};
