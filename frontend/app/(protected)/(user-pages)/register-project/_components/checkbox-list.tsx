"use client";

import { Card, CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Controller, useFormContext } from "react-hook-form";

import { useProjectRegistration } from "../_context/project-registration-provider";

import StaggeredFadeInList from "@/components/ui/animations/staggered-fade-in-list";

export type CheckboxOption = {
  value: string;
  label: string;
  description?: string;
  popular?: boolean;
  icon?: React.ReactNode;
};

type CheckboxListProps = {
  name: string;
  options: CheckboxOption[];
  maxSelection?: number;
  onChange?: (selected: string[]) => void;
};

export const CheckboxList = ({
  name,
  options,
  maxSelection,
  onChange,
}: CheckboxListProps) => {
  const { control, watch } = useFormContext();
  const { isValidating } = useProjectRegistration();

  const selectedItems: string[] = watch(name) || [];
  const max = maxSelection ?? options.length;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const handleSelectionChange = (optionValue: string) => {
          const isSelected = field.value?.includes(optionValue);
          let newSelection: string[];

          if (isSelected) {
            newSelection = field.value.filter(
              (val: string) => val !== optionValue,
            );
          } else {
            if ((field.value || []).length >= max) return; // limit check
            newSelection = [...(field.value || []), optionValue];
          }

          field.onChange(newSelection);
          onChange?.(newSelection); // optional side-effect hook
        };

        return (
          <div className="grid max-w-4xl grid-cols-1 gap-4 mx-auto sm:grid-cols-2">
            <StaggeredFadeInList>
              {options.map((option) => {
                const isSelected = selectedItems.includes(option.value);
                const isDisabled = !isSelected && selectedItems.length >= max;

                return (
                  <Card
                    key={option.value}
                    disableRipple
                    className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      isSelected
                        ? "ring-1 ring-primary bg-primary/5 border-primary/30"
                        : "hover:bg-content2 hover:shadow-lg"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    isDisabled={isValidating}
                    isPressable={!isDisabled}
                    onPress={() =>
                      !isDisabled && handleSelectionChange(option.value)
                    }
                  >
                    <CardBody className="p-4">
                      <div className="flex items-start space-x-3">
                        {option.icon && (
                          <div
                            className={`p-2 rounded-lg flex-shrink-0 ${
                              isSelected
                                ? "bg-primary/30 text-primary-foreground"
                                : "bg-content3 text-foreground/60"
                            }`}
                          >
                            {option.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="mb-1 text-sm font-semibold text-foreground">
                            {option.label}
                          </h3>
                          <p className="text-xs leading-relaxed text-foreground/60">
                            {option.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Checkbox
                            color="primary"
                            isDisabled={isDisabled}
                            isSelected={isSelected}
                            size="lg"
                            onValueChange={() =>
                              handleSelectionChange(option.value)
                            }
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </StaggeredFadeInList>
          </div>
        );
      }}
    />
  );
};
