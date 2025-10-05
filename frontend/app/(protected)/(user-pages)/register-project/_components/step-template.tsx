"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { ArrowRight, Clock, Star } from "lucide-react";

import { StepConfig } from "../_context/project-registration-provider";

import { PageTitle, Section } from "@/components/ui/reusable-components";

interface StepTemplateProps {
  step: StepConfig;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
  errors: Record<string, any>;
  steps?: { id: string; title: string; icon: any }[]; // Optional steps for progress display
}

export const StepTemplate: React.FC<StepTemplateProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  onNext,
  isLastStep,
  isSubmitting,
  isValidating,
  errors,
  steps = [], // Default to empty array if not provided
}) => {
  const StepComponent = step.component;
  const progress = (currentStepIndex / (totalSteps - 1)) * 100;

  const getButtonText = () => {
    if (isValidating) return "Validating...";
    if (isSubmitting) return "Submitting...";
    if (isLastStep) return "Finish Onboarding";

    return "Continue";
  };

  const getButtonIcon = () => {
    if (isValidating || isSubmitting) return null;
    if (isLastStep) return <Star className="w-4 h-4" />;

    return <ArrowRight className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-content1 to-content2">
      <Section padding="default">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center lg:col-span-2">
            <PageTitle
              centered
              className="text-2xl"
              size="md"
              subtitle="Help us understand your organization and project details"
              title="Blue Carbon Project Onboarding"
            />
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
              <Clock className="w-4 h-4" />
              <span>Onboarding takes less than 5 minutes</span>
            </div>
          </div>

          {/* Simple Progress Bar (fallback when steps array not provided) */}
          {step.showProgress && steps.length === 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground/80">
                  Step {currentStepIndex} of {totalSteps - 1}
                </span>
                <span className="text-sm text-foreground/60">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="w-full h-3 overflow-hidden rounded-full bg-content3">
                <div
                  className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-primary to-primary/80"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Step Content Card */}
          <Card className="mb-8 border shadow-none bg-content2/80 backdrop-blur-xs border-content2">
            <CardHeader className="p-6 pb-0 text-center sm:p-8 sm:pb-0">
              <div className="w-full">
                <h2 className="mb-2 text-2xl font-bold sm:text-3xl text-foreground">
                  {step.title}
                </h2>
                {step.subtitle && (
                  <p className="max-w-2xl mx-auto text-foreground/60">
                    {step.subtitle}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardBody className="p-6 sm:p-8">
              <StepComponent />
            </CardBody>
          </Card>

          {/* Next Button - Centered Below Content */}
          <div className="flex justify-center">
            <Button
              className="text-base font-semibold min-w-48 h-14"
              color="primary"
              disabled={isValidating || isSubmitting}
              endContent={getButtonIcon()}
              isLoading={isSubmitting || isValidating}
              size="lg"
              onPress={onNext}
            >
              {getButtonText()}
            </Button>
          </div>

          {/* Mini Progress Dots - Bottom Center */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStepIndex
                    ? "bg-primary w-8"
                    : i < currentStepIndex
                      ? "bg-primary w-2"
                      : "bg-content3 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
