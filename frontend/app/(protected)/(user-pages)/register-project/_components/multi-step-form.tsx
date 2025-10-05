"use client";

import { useFormContext } from "react-hook-form";

import { useProjectRegistration } from "../_context/project-registration-provider";

import { StepTemplate } from "./step-template";

export const MultiStepForm = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const {
    prev,
    next,
    isLastStep,
    isFirstStep,
    currentStepIndex,
    totalSteps,
    submitForm,
    isSubmitting,
    isValidating,
    currentStep,
  } = useProjectRegistration();

  const handleNext = async () => {
    if (isLastStep) {
      await submitForm();
    } else {
      await next();
    }
  };

  const handlePrev = () => {
    prev();
  };

  // Render welcome/custom layout steps differently
  if (currentStep.customLayout) {
    const StepComponent = currentStep.component;

    return (
      <StepComponent
        canGoNext={!isFirstStep || currentStep.isWelcomeStep}
        canGoPrev={!isFirstStep}
        isValidating={isValidating}
        onGetStarted={handleNext}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    );
  }

  // Use template for standard form steps with full-screen layout
  return (
    <StepTemplate
      currentStepIndex={currentStepIndex}
      errors={errors}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      isSubmitting={isSubmitting}
      isValidating={isValidating}
      step={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
};
