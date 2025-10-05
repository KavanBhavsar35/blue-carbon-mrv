// File: app/(dashboard)/register-project/_components/steps/location-details.tsx
"use client";

import { Input } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";

const indianCoastalStates = [
  { key: "west-bengal", label: "West Bengal" },
  { key: "odisha", label: "Odisha" },
  { key: "andhra-pradesh", label: "Andhra Pradesh" },
  { key: "tamil-nadu", label: "Tamil Nadu" },
  { key: "kerala", label: "Kerala" },
  { key: "karnataka", label: "Karnataka" },
  { key: "goa", label: "Goa" },
  { key: "maharashtra", label: "Maharashtra" },
  { key: "gujarat", label: "Gujarat" },
  { key: "daman-diu", label: "Daman & Diu" },
  { key: "puducherry", label: "Puducherry" },
  { key: "lakshadweep", label: "Lakshadweep" },
  { key: "andaman-nicobar", label: "Andaman & Nicobar Islands" },
];

export const LocationDetails = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const coordinates = useWatch({ name: "coordinates" });

  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // Mock function for getting current location
  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("coordinates", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // TODO: error handling UI
        },
      );
    }
    setIsLocationLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* State, District, Village */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Select
          {...register("state")}
          isRequired
          errorMessage={errors.state?.message as string}
          isInvalid={!!errors.state}
          label="State"
          placeholder="Select state"
          variant="flat"
        >
          {indianCoastalStates.map((state) => (
            <SelectItem key={state.key}>{state.label}</SelectItem>
          ))}
        </Select>

        <Input
          {...register("district")}
          isRequired
          errorMessage={errors.district?.message as string}
          isInvalid={!!errors.district}
          label="District"
          placeholder="Enter district name"
          variant="flat"
        />

        <Input
          {...register("village")}
          isRequired
          errorMessage={errors.village?.message as string}
          isInvalid={!!errors.village}
          label="Village/Area"
          placeholder="Village or locality name"
          variant="flat"
        />
      </div>

      {/* Coordinates Section */}
      <Card className="border border-divider">
        <CardHeader className="pb-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Project Coordinates</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Mark the exact location of your project site for verification and
              monitoring.
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {/* Coordinate Display */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              isReadOnly
              label="Latitude"
              placeholder="e.g., 22.5726"
              startContent={
                <span className="text-sm text-foreground/50">Lat:</span>
              }
              value={coordinates?.lat?.toString() || ""}
              variant="flat"
            />
            <Input
              isReadOnly
              label="Longitude"
              placeholder="e.g., 88.3639"
              startContent={
                <span className="text-sm text-foreground/50">Lng:</span>
              }
              value={coordinates?.lng?.toString() || ""}
              variant="flat"
            />
          </div>

          {/* Location Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              color="primary"
              isLoading={isLocationLoading}
              startContent={<Navigation className="w-4 h-4" />}
              variant="flat"
              onPress={getCurrentLocation}
            >
              Use Current Location
            </Button>
            <Button
              color="secondary"
              startContent={<MapPin className="w-4 h-4" />}
              variant="flat"
            >
              Select on Map
            </Button>
          </div>

          {/* Placeholder for Leaflet Map */}
          <div className="flex items-center justify-center w-full h-64 border rounded-lg bg-content2 border-divider">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-foreground/50" />
              <p className="text-sm text-foreground/70">
                Interactive Map (Leaflet integration)
              </p>
              <p className="mt-1 text-xs text-foreground/50">
                Click to select project location
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
