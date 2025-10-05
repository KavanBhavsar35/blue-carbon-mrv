"use client";

import React from "react";
import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";

import {
  ProjectRegistrationProvider,
  useProjectRegistration,
} from "./_context/project-registration-provider";
import { MultiStepForm } from "./_components/multi-step-form";

const Page = () => {
  return (
    <ProjectRegistrationProvider>
      <div className="relative pt-20">
        <BackButton />
        <MultiStepForm />
      </div>
    </ProjectRegistrationProvider>
  );
};

export default Page;

const BackButton = () => {
  const { isFirstStep, canNavigateBack, prev } = useProjectRegistration();

  const handleBack = () => {
    canNavigateBack && prev();
  };

  return isFirstStep ? null : (
    <Button
      isIconOnly
      className="sticky z-10 left-4 top-4"
      variant="light"
      onPress={handleBack}
    >
      <ArrowLeft />
    </Button>
  );
};
