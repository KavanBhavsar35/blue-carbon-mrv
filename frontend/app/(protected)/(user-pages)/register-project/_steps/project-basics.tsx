// File: app/(dashboard)/register-project/_components/steps/project-basics.tsx
"use client";

import { Input, Textarea } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert } from "@heroui/alert";
import { TreePine, Waves, MapPin } from "lucide-react";

import { RadioChipList } from "../_components/radio-chip-list";
import { RadioCardList } from "../_components/radio-list";

const projectTypes = [
  {
    value: "mangrove",
    label: "Mangrove Restoration",
    description: "Coastal mangrove plantation and restoration",
    icon: <TreePine className="w-4 h-4" />,
  },
  {
    value: "seagrass",
    label: "Seagrass Conservation",
    description: "Underwater seagrass bed restoration",
    icon: <Waves className="w-4 h-4" />,
  },
  {
    value: "salt_marsh",
    label: "Salt Marsh Restoration",
    description: "Coastal wetland ecosystem restoration",
    icon: <MapPin className="w-4 h-4" />,
  },
  
];

export const ProjectBasics = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const projectDescription = useWatch({ name: "projectDescription" });
  const characterCount = projectDescription ? projectDescription.length : 0;

  return (
    <div className="space-y-6">
      {/* Project Name */}
      <div>
        <Input
          {...register("projectName")}
          isRequired
          errorMessage={errors.projectName?.message as string}
          isInvalid={!!errors.projectName}
          label="Project Name"
          placeholder="e.g., Sundarbans Mangrove Restoration Initiative"
          variant="bordered"
        />
      </div>

      {/* Project Type */}
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            Project Type *
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            What type of coastal ecosystem are you working to restore?
          </p>
        </div>

        <RadioCardList columns={3} name="projectType" options={projectTypes} />

        {errors.projectType && (
          <Alert
            color="danger"
            description={errors.projectType.message as string}
            title="Error"
            variant="flat"
          />
        )}
      </div>

      {/* Project Description */}
      <div className="space-y-4">
        <div>
          <span className="block mb-2 text-sm font-medium text-gray-700">
            Project Description *
          </span>
          <p className="mb-3 text-sm text-gray-600">
            Provide a detailed description of your project including objectives,
            methodology, and expected environmental impact.
          </p>

          <div className="relative">
            <Textarea
              {...register("projectDescription")}
              className={`w-full ${errors.projectDescription ? "border-danger" : ""}`}
              maxLength={1000}
              placeholder="Example: Our project aims to restore 50 hectares of degraded mangrove ecosystem in the Sundarbans region. We plan to plant native species like Avicennia marina and Rhizophora mucronata, involving local fishing communities in planting and maintenance activities. The project will create a natural barrier against coastal erosion while sequestering approximately 2,500 tons of CO2 over 10 years..."
              rows={6}
              variant="bordered"
            />

            <div
              className={`absolute bottom-3 right-3 text-xs ${characterCount > 900
                  ? "text-red-500 font-medium"
                  : characterCount > 800
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
            >
              {characterCount}/1000
            </div>
          </div>

          {errors.projectDescription && (
            <Alert
              color="danger"
              description={errors.projectDescription.message as string}
              title="Error"
              variant="flat"
            />
          )}
        </div>
      </div>
    </div>
  );
};
