"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import {
  TreePine,
  Waves,
  MapPin,
  Thermometer,
  Droplets,
  Fish,
  Shield,
  TrendingUp,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { ProjectType } from "@/types";

const EcosystemGuide = () => {
  const [selectedEcosystem, setSelectedEcosystem] =
    useState<ProjectType>("MANGROVE");

  const ecosystems: Record<string, any> = {
    MANGROVE: {
      name: "Mangrove Forests",
      icon: <TreePine className="w-8 h-8" />,
      color: "success" as const,
      description:
        "Salt-tolerant trees and shrubs that grow in coastal intertidal zones",
      carbonSequestration: "25-35 tons CO₂/hectare/year",
      globalCoverage: "152,000 km²",
      indiaCoverage: "4,975 km²",
      depth: "Up to 3 meters soil depth",
      salinity: "10-35 ppt",
      temperature: "20-35°C",

      keyFeatures: [
        "Highest carbon storage among coastal ecosystems",
        "Pneumatophores (aerial roots) for oxygen intake",
        "Salt filtration through leaves and roots",
        "Nursery habitat for marine species",
      ],

      benefits: [
        {
          title: "Coastal Protection",
          description: "Reduces wave energy by up to 70%",
          icon: <Shield className="w-4 h-4" />,
        },
        {
          title: "Biodiversity Hub",
          description: "Supports 80+ fish species",
          icon: <Fish className="w-4 h-4" />,
        },
        {
          title: "Carbon Storage",
          description: "Stores 3-5x more carbon than rainforests",
          icon: <TrendingUp className="w-4 h-4" />,
        },
        {
          title: "Livelihood Support",
          description: "Supports fishing communities",
          icon: <Users className="w-4 h-4" />,
        },
      ],

      species: [
        {
          name: "Avicennia marina",
          common: "Grey Mangrove",
          regions: "Gujarat, Maharashtra",
        },
        {
          name: "Rhizophora mucronata",
          common: "Red Mangrove",
          regions: "West Bengal, Odisha",
        },
        {
          name: "Bruguiera gymnorhiza",
          common: "Black Mangrove",
          regions: "Andaman & Nicobar",
        },
        {
          name: "Sonneratia apetala",
          common: "Apple Mangrove",
          regions: "Sundarbans",
        },
      ],

      threats: [
        "Aquaculture development",
        "Urban coastal development",
        "Pollution and sedimentation",
        "Climate change and sea level rise",
      ],

      restoration: [
        "Site assessment and preparation",
        "Species selection based on salinity zones",
        "Community-based planting programs",
        "Long-term monitoring and maintenance",
      ],
    },

    SEAGRASS: {
      name: "Seagrass Meadows",
      icon: <Waves className="w-8 h-8" />,
      color: "primary" as const,
      description:
        "Underwater flowering plants that form dense meadows in shallow coastal waters",
      carbonSequestration: "10-25 tons CO₂/hectare/year",
      globalCoverage: "300,000 km²",
      indiaCoverage: "3,000 km²",
      depth: "0.5-10 meters water depth",
      salinity: "30-40 ppt",
      temperature: "15-30°C",

      keyFeatures: [
        "Only marine flowering plants",
        "Extensive root and rhizome systems",
        "Rapid sediment trapping ability",
        "High productivity in shallow waters",
      ],

      benefits: [
        {
          title: "Sediment Stabilization",
          description: "Prevents coastal erosion",
          icon: <Shield className="w-4 h-4" />,
        },
        {
          title: "Marine Habitat",
          description: "Nursery for commercial fish",
          icon: <Fish className="w-4 h-4" />,
        },
        {
          title: "Carbon Burial",
          description: "Efficient long-term carbon storage",
          icon: <TrendingUp className="w-4 h-4" />,
        },
        {
          title: "Water Quality",
          description: "Filters nutrients and sediments",
          icon: <Droplets className="w-4 h-4" />,
        },
      ],

      species: [
        {
          name: "Zostera marina",
          common: "Eelgrass",
          regions: "Kashmir lakes",
        },
        {
          name: "Halodule uninervis",
          common: "Narrowleaf Seagrass",
          regions: "Tamil Nadu, Kerala",
        },
        {
          name: "Cymodocea serrulata",
          common: "Serrated Ribbonweed",
          regions: "Lakshadweep, A&N Islands",
        },
        {
          name: "Thalassia hemprichii",
          common: "Fern Seagrass",
          regions: "Andaman Sea",
        },
      ],

      threats: [
        "Coastal development and dredging",
        "Anchor damage from boats",
        "Eutrophication from agriculture",
        "Climate change and warming seas",
      ],

      restoration: [
        "Transplantation of healthy shoots",
        "Seed collection and germination",
        "Protection from physical disturbance",
        "Water quality improvement",
      ],
    },

    SALT_MARSH: {
      name: "Salt Marshes",
      icon: <MapPin className="w-8 h-8" />,
      color: "secondary" as const,
      description: "Coastal wetlands flooded and drained by tidal waters",
      carbonSequestration: "15-30 tons CO₂/hectare/year",
      globalCoverage: "41,000 km²",
      indiaCoverage: "1,500 km²",
      depth: "Intertidal zone",
      salinity: "5-35 ppt",
      temperature: "15-40°C",

      keyFeatures: [
        "Halophytic (salt-tolerant) vegetation",
        "Regular tidal flooding cycles",
        "High organic matter accumulation",
        "Distinct zonation patterns",
      ],

      benefits: [
        {
          title: "Storm Protection",
          description: "Natural buffer against storms",
          icon: <Shield className="w-4 h-4" />,
        },
        {
          title: "Bird Habitat",
          description: "Critical for migratory birds",
          icon: <Fish className="w-4 h-4" />,
        },
        {
          title: "Carbon Sequestration",
          description: "Long-term soil carbon storage",
          icon: <TrendingUp className="w-4 h-4" />,
        },
        {
          title: "Pollution Filter",
          description: "Removes excess nutrients",
          icon: <Droplets className="w-4 h-4" />,
        },
      ],

      species: [
        {
          name: "Salicornia brachiata",
          common: "Glasswort",
          regions: "Gujarat, Rajasthan",
        },
        {
          name: "Suaeda maritima",
          common: "Sea Blite",
          regions: "Tamil Nadu, Andhra Pradesh",
        },
        {
          name: "Arthrocnemum indicum",
          common: "Indian Samphire",
          regions: "West coast",
        },
        {
          name: "Aeluropus lagopoides",
          common: "Salt Grass",
          regions: "Coastal plains",
        },
      ],

      threats: [
        "Land reclamation for agriculture",
        "Salt production activities",
        "Industrial pollution",
        "Altered hydrology from development",
      ],

      restoration: [
        "Hydrological restoration",
        "Native species reintroduction",
        "Invasive species control",
        "Community engagement programs",
      ],
    },
  };

  const currentEco = ecosystems[selectedEcosystem];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 dark:from-background dark:via-content1 dark:to-content2 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Blue Carbon Ecosystem Guide
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Comprehensive guide to coastal ecosystems that sequester carbon and
            protect our shores
          </p>
        </div>

        {/* Ecosystem Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(ecosystems)
            // .map(([key, eco]) => [eco, key.toUpperCase()])
            .map(([key, eco]) => (
              <Card
                key={key}
                disableRipple
                isPressable
                className={`border cursor-pointer transition-all duration-300 ${selectedEcosystem === key
                    ? `border-${eco.color} bg-${eco.color}/10 scale-105`
                    : "border-divider hover:border-primary/50"
                  }`}
                onPress={() => setSelectedEcosystem(key as ProjectType)}
              >
                <CardBody className="p-6 text-center">
                  <div className={`flex justify-center mb-3 text-${eco.color}`}>
                    {eco.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{eco.name}</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    {eco.description}
                  </p>
                  <Chip color={eco.color} size="sm" variant="flat">
                    {eco.carbonSequestration}
                  </Chip>
                </CardBody>
              </Card>
            ))}
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`text-${currentEco.color}`}>
                    {currentEco.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{currentEco.name}</h2>
                </div>
              </CardHeader>
              <CardBody>
                <Tabs>
                  <Tab key="overview" title="Overview">
                    <div className="space-y-6 pt-4">
                      <p className="text-foreground/80 leading-relaxed">
                        {currentEco.description}
                      </p>

                      {/* Key Features */}
                      <div>
                        <h3 className="font-semibold mb-3">
                          Key Characteristics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentEco.keyFeatures.map(
                            (feature: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Environmental Benefits */}
                      <div>
                        <h3 className="font-semibold mb-3">
                          Environmental Benefits
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentEco.benefits.map(
                            (benefit: any, index: number) => (
                              <Card
                                key={index}
                                className="border border-divider/50"
                              >
                                <CardBody className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`p-2 bg-${currentEco.color}/10 rounded-lg text-${currentEco.color}`}
                                    >
                                      {benefit.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm mb-1">
                                        {benefit.title}
                                      </h4>
                                      <p className="text-xs text-foreground/70">
                                        {benefit.description}
                                      </p>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>

                  <Tab key="species" title="Species & Distribution">
                    <div className="space-y-6 pt-4">
                      <div>
                        <h3 className="font-semibold mb-3">
                          Common Species in India
                        </h3>
                        <div className="space-y-3">
                          {currentEco.species.map(
                            (species: any, index: number) => (
                              <Card
                                key={index}
                                className="border border-divider/50"
                              >
                                <CardBody className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-sm mb-1">
                                        {species.common}
                                      </h4>
                                      <p className="text-xs font-mono text-foreground/60 mb-2">
                                        {species.name}
                                      </p>
                                      <Chip
                                        color="default"
                                        size="sm"
                                        variant="flat"
                                      >
                                        {species.regions}
                                      </Chip>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>

                  <Tab key="conservation" title="Conservation & Restoration">
                    <div className="space-y-6 pt-4">
                      {/* Threats */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-danger" />
                          Major Threats
                        </h3>
                        <div className="space-y-2">
                          {currentEco.threats.map(
                            (threat: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-danger/5 rounded"
                              >
                                <div className="w-2 h-2 bg-danger rounded-full" />
                                <span className="text-sm">{threat}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Restoration */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          Restoration Approaches
                        </h3>
                        <div className="space-y-2">
                          {currentEco.restoration.map(
                            (approach: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-success/5 rounded"
                              >
                                <div className="w-2 h-2 bg-success rounded-full" />
                                <span className="text-sm">{approach}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        color="primary"
                        endContent={<ArrowRight className="w-4 h-4" />}
                      >
                        Start Restoration Project
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Environmental Conditions */}
            <Card className="bg-white/80 dark:bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="text-lg font-semibold">
                  Environmental Conditions
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-danger" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {currentEco.temperature}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary" />
                    <span className="text-sm">Salinity</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {currentEco.salinity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Depth Range</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {currentEco.depth}
                  </span>
                </div>
              </CardBody>
            </Card>

            {/* Carbon Stats */}
            <Card
              className={`bg-${currentEco.color}/5 border border-${currentEco.color}/20`}
            >
              <CardHeader>
                <h3 className="text-lg font-semibold">Carbon Sequestration</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold text-${currentEco.color} mb-2`}
                  >
                    {currentEco.carbonSequestration}
                  </div>
                  <p className="text-sm text-foreground/70">
                    Annual carbon storage
                  </p>
                </div>

                <Progress
                  className="mb-2"
                  color={currentEco.color}
                  value={
                    (parseInt(currentEco.carbonSequestration.split("-")[1]) /
                      35) *
                    100
                  }
                />

                <p className="text-xs text-center text-foreground/60">
                  Compared to maximum blue carbon potential (35 tons/ha/year)
                </p>
              </CardBody>
            </Card>

            {/* Global vs India Coverage */}
            <Card className="bg-white/80 dark:bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="text-lg font-semibold">Coverage Area</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Global Coverage</span>
                    <span className="text-sm font-semibold">
                      {currentEco.globalCoverage}
                    </span>
                  </div>
                  <Progress color="default" size="sm" value={100} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">India Coverage</span>
                    <span className="text-sm font-semibold">
                      {currentEco.indiaCoverage}
                    </span>
                  </div>
                  <Progress
                    color="warning"
                    size="sm"
                    value={
                      (parseInt(currentEco.indiaCoverage.replace(",", "")) /
                        parseInt(currentEco.globalCoverage.replace(",", ""))) *
                      100
                    }
                  />
                </div>

                <p className="text-xs text-foreground/60">
                  India accounts for{" "}
                  {(
                    (parseInt(currentEco.indiaCoverage.replace(",", "")) /
                      parseInt(currentEco.globalCoverage.replace(",", ""))) *
                    100
                  ).toFixed(1)}
                  % of global coverage
                </p>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-primary/10 to-success/10">
              <CardBody className="p-6 text-center">
                <Globe className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Ready to Contribute?</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Start your own {currentEco.name.toLowerCase()} restoration
                  project
                </p>
                <Button
                  color="primary"
                  endContent={<ArrowRight className="w-4 h-4" />}
                  size="sm"
                >
                  Register Project
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemGuide;
