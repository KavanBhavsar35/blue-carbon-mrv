"use client";

import { Input } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";

export const OrganizationDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const organizationType = useWatch({ name: "organizationType" });

  const getOrgNamePlaceholder = () => {
    switch (organizationType) {
      case "ngo":
        return "e.g., Green Coast Foundation";
      case "panchayat":
        return "e.g., Kakdwip Gram Panchayat";
      case "community":
        return "e.g., Sundarbans Fishermen Cooperative";
      case "company":
        return "e.g., EcoTech Solutions Pvt. Ltd.";
      default:
        return "Enter organization name";
    }
  };

  const showRegistrationNumber =
    organizationType === "ngo" || organizationType === "company";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Organization Name */}
        <div>
          <Input
            {...register("organizationName")}
            isRequired
            errorMessage={errors.organizationName?.message as string}
            isInvalid={!!errors.organizationName}
            label="Organization Name"
            placeholder={getOrgNamePlaceholder()}
            variant="flat"
          />
        </div>

        {/* Registration Number - Conditional */}
        {showRegistrationNumber && (
          <div>
            <Input
              {...register("registrationNumber")}
              required
              description="Optional but recommended for verification"
              label={`${organizationType === "ngo" ? "NGO" : "Company"} Registration Number`}
              placeholder={
                organizationType === "ngo"
                  ? "e.g., 12A/80G/FCRA number"
                  : "e.g., CIN or registration number"
              }
              variant="flat"
            />
          </div>
        )}

        {/* Contact Person */}
        <div>
          <Input
            {...register("contactPerson")}
            isRequired
            errorMessage={errors.contactPerson?.message as string}
            isInvalid={!!errors.contactPerson}
            label="Contact Person Name"
            placeholder="Primary contact for this project"
            variant="flat"
          />
        </div>

        {/* Email and Phone in a row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            {...register("email")}
            isRequired
            errorMessage={errors.email?.message as string}
            isInvalid={!!errors.email}
            label="Email Address"
            placeholder="contact@organization.org"
            type="email"
            variant="flat"
          />

          <Input
            {...register("phone")}
            isRequired
            errorMessage={errors.phone?.message as string}
            isInvalid={!!errors.phone}
            label="Phone Number"
            placeholder="+91 XXXXX XXXXX"
            variant="flat"
          />
        </div>
      </div>
    </div>
  );
};
