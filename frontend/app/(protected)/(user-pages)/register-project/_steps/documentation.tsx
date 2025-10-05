"use client";

import { Checkbox } from "@heroui/checkbox";
import { useFormContext } from "react-hook-form";
import { Alert } from "@heroui/alert";
import { Card, CardBody } from "@heroui/card";
import { FileText, Shield, CheckCircle } from "lucide-react";

export const Documentation = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const hasLegalPermission = watch("hasLegalPermission");
  const hasSurveyReport = watch("hasSurveyReport");
  const hasEnvironmentalClearance = watch("hasEnvironmentalClearance");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Documentation & Permissions
        </h3>
        <p className="text-sm text-foreground/70 mb-6">
          Please confirm which documents and permissions you have for this
          project.
        </p>
      </div>

      <div className="space-y-4">
        {/* Legal Permission */}
        <Card
          disableRipple
          isPressable
          className={`w-full border ${hasLegalPermission ? "border-success bg-success/5" : "border-divider"}`}
          onPress={() => setValue("hasLegalPermission", !hasLegalPermission)}
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <Checkbox
                  isRequired
                  isSelected={hasLegalPermission}
                  onValueChange={(checked) =>
                    setValue("hasLegalPermission", checked)
                  }
                >
                  <span className="font-semibold">
                    Legal Permission/Land Rights
                  </span>
                </Checkbox>
                <p className="text-sm text-foreground/70 mt-1 ml-6">
                  I have legal permission or rights to implement this project on
                  the specified land/water body
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Survey Report */}
        <Card
          disableRipple
          isPressable
          className={`w-full border ${hasSurveyReport ? "border-success bg-success/5" : "border-divider"}`}
          onPress={() => setValue("hasSurveyReport", !hasSurveyReport)}
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <Checkbox
                  isSelected={hasSurveyReport}
                  onValueChange={(checked) =>
                    setValue("hasSurveyReport", checked)
                  }
                >
                  <span className="font-semibold">Site Survey Report</span>
                </Checkbox>
                <p className="text-sm text-foreground/70 mt-1 ml-6">
                  I have conducted or have access to a baseline survey of the
                  project site
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Environmental Clearance */}
        <Card
          disableRipple
          isPressable
          className={`w-full border ${hasEnvironmentalClearance ? "border-success bg-success/5" : "border-divider"}`}
          onPress={() =>
            setValue("hasEnvironmentalClearance", !hasEnvironmentalClearance)
          }
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <Checkbox
                  isSelected={hasEnvironmentalClearance}
                  onValueChange={(checked) =>
                    setValue("hasEnvironmentalClearance", checked)
                  }
                >
                  <span className="font-semibold">Environmental Clearance</span>
                </Checkbox>
                <p className="text-sm text-foreground/70 mt-1 ml-6">
                  I have obtained necessary environmental clearances (if
                  required for the project scale)
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Validation Error */}
      {errors.hasLegalPermission && (
        <Alert
          color="danger"
          description={errors.hasLegalPermission.message as string}
          title="Documentation Required"
          variant="flat"
        />
      )}

      {/* Info Note */}
      <Alert
        color="primary"
        description="Legal permission is mandatory. Other documents are recommended and will strengthen your application."
        title="Note"
        variant="flat"
      />
    </div>
  );
};
