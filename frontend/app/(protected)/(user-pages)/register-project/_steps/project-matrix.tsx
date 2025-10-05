// File: app/(dashboard)/register-project/_components/steps/project-metrics.tsx
"use client";

import { Input } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardBody } from "@heroui/card";
import { Calculator, TrendingUp, TreePine } from "lucide-react";

export const ProjectMetrics = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const totalArea = useWatch({ name: "totalArea" });
  const projectType = useWatch({ name: "projectType" });

  // Calculate estimated credits based on area and project type
  const calculateEstimatedCredits = (area: number, type: string) => {
    const multipliers = {
      mangrove: 25, // tons CO2/hectare/year
      seagrass: 15, // tons CO2/hectare/year
      "salt-marsh": 20, // tons CO2/hectare/year
    };

    return Math.round(
      area * (multipliers[type as keyof typeof multipliers] || 20),
    );
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const area = parseFloat(e.target.value) || 0;

    if (area > 0 && projectType) {
      const estimated = calculateEstimatedCredits(area, projectType);

      setValue("estimatedCreditsPerYear", estimated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Area */}
      <div>
        <Input
          {...register("totalArea", {
            valueAsNumber: true,
            onChange: handleAreaChange,
          })}
          description="Minimum 0.1 hectares required for registration"
          endContent={
            <span className="text-sm text-foreground/50">hectares</span>
          }
          errorMessage={errors.totalArea?.message as string}
          isInvalid={!!errors.totalArea}
          label="Total Project Area (Hectares)"
          min="0.1"
          placeholder="e.g., 10.5"
          startContent={<TreePine className="w-4 h-4 text-foreground/50" />}
          step="0.1"
          type="number"
          variant="bordered"
        />
      </div>

      {/* Estimated Credits */}
      <div>
        <Input
          {...register("estimatedCreditsPerYear", { valueAsNumber: true })}
          description="This will be verified during the review process"
          endContent={
            <span className="text-sm text-foreground/50">tons CO₂e</span>
          }
          errorMessage={errors.estimatedCreditsPerYear?.message as string}
          isInvalid={!!errors.estimatedCreditsPerYear}
          label="Estimated Carbon Credits per Year"
          min="1"
          placeholder="Auto-calculated based on area"
          startContent={<Calculator className="w-4 h-4 text-foreground/50" />}
          step="1"
          type="number"
          variant="bordered"
        />
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-sm">Carbon Sequestration</p>
                <p className="text-xs text-foreground/70">
                  {projectType === "mangrove" &&
                    "Mangroves: ~25 tons CO₂/hectare/year"}
                  {projectType === "seagrass" &&
                    "Seagrass: ~15 tons CO₂/hectare/year"}
                  {projectType === "salt-marsh" &&
                    "Salt Marsh: ~20 tons CO₂/hectare/year"}
                  {!projectType && "Rates vary by ecosystem type"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-sm">Total Potential</p>
                <p className="text-xs text-foreground/70">
                  {totalArea && projectType
                    ? `~${calculateEstimatedCredits(totalArea, projectType) * 10} tons over 10 years`
                    : "Enter area to see projection"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
