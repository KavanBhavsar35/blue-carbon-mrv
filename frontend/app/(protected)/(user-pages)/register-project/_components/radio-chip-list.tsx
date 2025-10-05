"use client";

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
  color?: string; // for future use
};

type RadioChipListProps = {
  name: string; // form field name
  options: RadioOption[];
  onChange?: (value: string) => void;
  columns?: 2 | 3;
};

export const RadioChipList = ({
  name,
  options,
  onChange,
  columns = 3,
}: RadioChipListProps) => {
  const { control, watch } = useFormContext();
  const { isValidating } = useProjectRegistration();
  const selectedValue = watch(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={`grid gap-2 ${
            columns === 2
              ? "grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          <StaggeredFadeInList>
            {options.map((option) => {
              const isSelected = selectedValue === option.value;

              return (
                <button
                  key={option.value}
                  className="w-full"
                  disabled={isValidating}
                  type="button"
                  onClick={() => {
                    field.onChange(option.value);
                    onChange?.(option.value);
                  }}
                >
                  <Chip
                    className={`w-full justify-start px-4 py-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-primary bg-primary/5 border-primary/50"
                        : "hover:shadow-xs"
                    }`}
                    color={isSelected ? "primary" : "default"}
                    variant="flat"
                  >
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-foreground/60">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </Chip>
                </button>
              );
            })}
          </StaggeredFadeInList>
        </div>
      )}
    />
  );
};
