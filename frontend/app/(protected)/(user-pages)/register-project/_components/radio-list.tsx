"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Controller, useFormContext } from "react-hook-form";

import { useProjectRegistration } from "../_context/project-registration-provider";

import StaggeredFadeInList from "@/components/ui/animations/staggered-fade-in-list";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  popular?: boolean;
  icon?: React.ReactNode;
  color?: string; // future use
};

type RadioCardListProps = {
  name: string; // form field name
  options: RadioOption[];
  onChange?: (value: string) => void; // optional change hook
  columns?: 2 | 3;
};

export const RadioCardList = ({
  name,
  options,
  onChange,
  columns = 3,
}: RadioCardListProps) => {
  const { control, watch } = useFormContext();
  const { isValidating } = useProjectRegistration();
  const selectedValue = watch(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={`grid max-w-4xl grid-cols-1 gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-${columns}`}
        >
          <StaggeredFadeInList>
            {options.map((option) => {
              const isSelected = selectedValue === option.value;

              return (
                <Card
                  key={option.value}
                  disableRipple
                  isPressable
                  className={`relative transition-all duration-200 hover:scale-[1.02] size-full ${
                    isSelected
                      ? "ring-2 ring-primary bg-primary/5 border-primary/50"
                      : "hover:bg-content1/70 hover:shadow-lg"
                  }`}
                  isDisabled={isValidating}
                  onPress={() => {
                    field.onChange(option.value);
                    onChange?.(option.value);
                  }}
                >
                  {option.popular && (
                    <Chip
                      className="absolute m-2 end-0"
                      color="primary"
                      variant="flat"
                    >
                      Popular
                    </Chip>
                  )}

                  <CardBody className="relative p-6 text-left">
                    <div className="flex items-start space-x-3">
                      {option.icon && (
                        <div
                          className={
                            "p-2 rounded-lg flex-shrink-0 bg-content3 text-foreground/60"
                          }
                        >
                          {option.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 text-sm font-semibold text-foreground">
                          {option.label}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </StaggeredFadeInList>
        </div>
      )}
    />
  );
};
