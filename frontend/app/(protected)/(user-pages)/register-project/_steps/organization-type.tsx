"use client";

import { Users, Building, TreePine, Building2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Alert } from "@heroui/alert";

import { RadioCardList } from "../_components/radio-list";

const organizationOptions = [
  {
    value: "ngo",
    label: "NGO / Non-Profit",
    description:
      "Registered non-governmental organization working on environmental projects",
    icon: <Users className="w-5 h-5" />,
    popular: true,
  },
  {
    value: "panchayat",
    label: "Panchayat / Local Government",
    description:
      "Village, block, or district panchayat implementing coastal restoration",
    icon: <Building className="w-5 h-5" />,
  },
  {
    value: "community",
    label: "Community Group",
    description: "Local community group, SHG, or fishing cooperative",
    icon: <TreePine className="w-5 h-5" />,
  },
  {
    value: "company",
    label: "Private Company",
    description: "Registered business entity investing in blue carbon projects",
    icon: <Building2 className="w-5 h-5" />,
  },
];

export const OrganizationType = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          What type of organization are you? *
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Select the category that best describes your organization. This helps
          us understand your capabilities and requirements.
        </p>
      </div>

      <RadioCardList
        columns={2}
        name="organizationType"
        options={organizationOptions}
      />

      {errors.organizationType && (
        <Alert
          color="danger"
          description={errors.organizationType.message as string}
          title="Error"
          variant="flat"
        />
      )}
    </div>
  );
};
