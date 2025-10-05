"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Slider, SliderProps, SliderValue } from "@heroui/slider";
import { Tabs, Tab } from "@heroui/tabs";
import { Progress } from "@heroui/progress";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import {
  Calculator,
  TreePine,
  Waves,
  MapPin,
  TrendingUp,
  Info,
  IndianRupee,
  Target,
  Download,
  Sparkles,
  Globe,
  Leaf,
} from "lucide-react";
import { ChipVariantProps } from "@heroui/theme";

import { ProjectType } from "@/types";

const CarbonCreditCalculator = () => {
  // State for calculator inputs
  const [area, setArea] = useState("10");
  const [ecosystemType, setEcosystemType] = useState<ProjectType>("MANGROVE");
  const [projectDuration, setProjectDuration] = useState("10");
  const [survivalRate, setSurvivalRate] = useState<SliderValue>(85);
  const [survivalRateSliderColor, setSurvivalRateSliderColor] =
    useState<SliderProps["color"]>("success");
  const [soilDepth, setSoilDepth] = useState<SliderValue>(50);
  const [soilDepthSliderColor, setSoilDepthSliderColor] =
    useState<SliderProps["color"]>("success");
  const [biomassGrowthRate, setBiomassGrowthRate] = useState<SliderValue>(100);
  const [biomassGrowthRateSliderColor, setBiomassGrowthRateSliderColor] =
    useState<SliderProps["color"]>("success");
  const [carbonPriceINR, setCarbonPriceINR] = useState("1250"); // ~$15 USD

  const handleSurvivalRateChange = (value: SliderValue) => {
    value = Number(value);
    let color: SliderProps["color"] = "success";

    setSurvivalRate(value);
    if (Number(value) >= 80) {
      color = "success";
    } else if (Number(value) >= 65) {
      color = "warning";
    } else {
      color = "danger";
    }
    setSurvivalRateSliderColor(color);
  };
  const handleBiomassGrowthRateChange = (value: SliderValue) => {
    value = Number(value);
    let color: SliderProps["color"] = "success";

    setBiomassGrowthRate(value);
    if (Number(value) >= 110) {
      color = "success";
    } else if (Number(value) >= 90) {
      color = "warning";
    } else {
      color = "danger";
    }
    setBiomassGrowthRateSliderColor(color);
  };
  const handleSoilDepthChange = (value: SliderValue) => {
    value = Number(value);
    let color: SliderProps["color"] = "success";

    setSoilDepth(value);
    if (Number(value) >= 73) {
      color = "success";
    } else if (Number(value) >= 47) {
      color = "warning";
    } else {
      color = "danger";
    }
    setSoilDepthSliderColor(color);
  };

  // Generic change handler

  // Calculated results
  const [results, setResults] = useState({
    annualCredits: 0,
    totalCredits: 0,
    potentialRevenue: 0,
    co2Equivalent: 0,
    carsOffRoad: 0,
  });

  type EcosystemData = {
    name: string;
    icon: React.ReactNode;
    carbonRate: { min: number; max: number; avg: number };
    biomassCarbon: number;
    soilCarbon: number;
    color: ChipVariantProps["color"];
    gradient: string;
    description: string;
  };

  // Ecosystem parameters with updated INR context
  const ecosystemData: Record<ProjectType, EcosystemData> = {
    MANGROVE: {
      name: "Mangrove Forest",
      icon: <TreePine className="w-5 h-5" />,
      carbonRate: { min: 20, max: 35, avg: 27.5 }, // tons CO2/hectare/year
      biomassCarbon: 150,
      soilCarbon: 300,
      color: "success",
      gradient:
        "from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      description: "Highest carbon sequestration among coastal ecosystems",
    },
    SEAGRASS: {
      name: "Seagrass Meadow",
      icon: <Waves className="w-5 h-5" />,
      carbonRate: { min: 10, max: 25, avg: 17.5 },
      biomassCarbon: 50,
      soilCarbon: 200,
      color: "primary",
      gradient:
        "from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20",
      description: "Efficient carbon storage in sediments",
    },
    SALT_MARSH: {
      name: "Salt Marsh",
      icon: <MapPin className="w-5 h-5" />,
      carbonRate: { min: 15, max: 30, avg: 22.5 },
      biomassCarbon: 80,
      soilCarbon: 250,
      color: "secondary" as const,
      gradient:
        "from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      description: "Excellent long-term carbon storage",
    },
    CORAL_REEF: {
      name: "Coral Reef",
      icon: <Globe className="w-5 h-5" />, // 🌊 alternative could be a custom coral SVG
      carbonRate: { min: 2, max: 6, avg: 4 }, // reefs store less direct carbon, but vital habitat
      biomassCarbon: 30,
      soilCarbon: 50,
      color: "warning",
      gradient:
        "from-orange-100 to-rose-100 dark:from-orange-900/20 dark:to-rose-900/20",
      description:
        "Biodiversity hotspots; support carbon cycling though less direct storage",
    },
    KELP_FOREST: {
      name: "Kelp Forest",
      icon: <TreePine className="w-5 h-5 rotate-180" />, // looks like seaweed if rotated
      carbonRate: { min: 5, max: 15, avg: 10 }, // strong sequestration if exported to deep sea
      biomassCarbon: 120,
      soilCarbon: 80,
      color: "success" as const,
      gradient:
        "from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20",
      description:
        "Underwater forests that capture carbon efficiently, especially when biomass sinks",
    },
  };

  // Calculate carbon credits with useCallback to prevent infinite re-renders
  const calculateResults = useCallback(() => {
    const ecosystem = ecosystemData[ecosystemType];
    const areaNum = parseFloat(area) || 0;
    const durationNum = parseInt(projectDuration) || 0;
    const priceNum = parseFloat(carbonPriceINR) || 0;

    // Adjust carbon rate based on survival rate and growth conditions
    const baseRate = ecosystem.carbonRate.avg;
    const survivalFactor = Number(survivalRate) / 100;
    const growthFactor = Number(biomassGrowthRate) / 100;
    const soilFactor = Math.min(Number(soilDepth) / 100, 1);

    const adjustedRate = baseRate * survivalFactor * growthFactor * soilFactor;
    const annualCredits = areaNum * adjustedRate;
    const totalCredits = annualCredits * durationNum;

    // Financial calculations in INR
    const potentialRevenue = totalCredits * priceNum;

    // Environmental impact comparisons
    const co2Equivalent = totalCredits;
    const carsOffRoad = Math.round(co2Equivalent / 4.6);

    setResults({
      annualCredits: Math.round(annualCredits),
      totalCredits: Math.round(totalCredits),
      potentialRevenue: Math.round(potentialRevenue),
      co2Equivalent: Math.round(co2Equivalent),
      carsOffRoad,
    });
  }, [
    area,
    ecosystemType,
    projectDuration,
    survivalRate,
    soilDepth,
    biomassGrowthRate,
    carbonPriceINR,
  ]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const ecosystem = ecosystemData[ecosystemType];

  const handleRegisterProject = () => {
    // Navigate to project onboarding
    window.location.href = "/register-project";
  };

  const handleExportReport = () => {
    // Generate and download report
    const reportData = {
      projectDetails: {
        ecosystemType: ecosystem.name,
        area: `${area} hectares`,
        duration: `${projectDuration} years`,
        location: "India", // You can make this dynamic
      },
      parameters: {
        survivalRate: `${survivalRate}%`,
        biomassGrowthRate: `${biomassGrowthRate}%`,
        soilDepth: `${soilDepth} cm`,
        carbonPrice: `₹${carbonPriceINR} per ton`,
      },
      results,
    };

    // eslint-disable-next-line no-console
    console.log("Exporting report:", reportData);
    // TODO: Implement actual PDF/Excel export here
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-content1 via-content2 to-content3 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-primary to-success rounded-2xl blur-lg" />
              <div className="relative p-4 bg-gradient-to-r from-primary to-success rounded-2xl">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-warning animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-primary to-success bg-clip-text">
            Blue Carbon Credit Calculator
          </h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-foreground/80">
            Estimate the carbon sequestration potential and financial returns of
            your coastal restoration project in India
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Chip
              color="primary"
              startContent={<Globe className="w-4 h-4" />}
              variant="flat"
            >
              Indian Market Standards
            </Chip>
            <Chip
              color="success"
              startContent={<IndianRupee className="w-4 h-4" />}
              variant="flat"
            >
              INR Calculations
            </Chip>
            <Chip
              color="secondary"
              startContent={<Leaf className="w-4 h-4" />}
              variant="flat"
            >
              Verified Methodology
            </Chip>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* Input Parameters */}
          <div className="space-y-6">
            {/* Project Parameters */}
            <Card className="border shadow-lg bg-content1 border-divider/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Project Parameters</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                {/* Ecosystem Type Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground/90">
                    Ecosystem Type
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(ecosystemData).map(([key, data]) => (
                      <Card
                        key={key}
                        disableRipple
                        isPressable
                        className={`cursor-pointer transition-all duration-200 ${
                          ecosystemType === key
                            ? `bg-gradient-to-r ${data.gradient} border-2 border-${data.color}/50 shadow-md`
                            : "bg-content2 hover:bg-content3 border border-divider hover:border-primary/30"
                        }`}
                        onPress={() => setEcosystemType(key as ProjectType)}
                      >
                        <CardBody className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 bg-${data.color}/20 rounded-lg text-${data.color}`}
                            >
                              {data.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="mb-1 text-sm font-semibold">
                                {data.name}
                              </h4>
                              <p className="mb-2 text-xs text-foreground/70">
                                {data.description}
                              </p>
                              <div className="flex items-center gap-2">
                                <Chip
                                  color={
                                    data.color as ChipVariantProps["color"]
                                  }
                                  size="sm"
                                  variant="flat"
                                >
                                  {data.carbonRate.min}-{data.carbonRate.max}{" "}
                                  tons CO₂/ha/year
                                </Chip>
                              </div>
                            </div>
                            {ecosystemType === key && (
                              <div className="text-success">
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Basic Parameters */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    endContent={
                      <span className="text-sm text-foreground/50">
                        hectares
                      </span>
                    }
                    label="Project Area"
                    min="0.1"
                    placeholder="Enter area"
                    step="0.1"
                    type="number"
                    value={area}
                    variant="bordered"
                    onValueChange={setArea}
                  />
                  <Input
                    endContent={
                      <span className="text-sm text-foreground/50">years</span>
                    }
                    label="Project Duration"
                    max="50"
                    min="1"
                    placeholder="Enter duration"
                    type="number"
                    value={projectDuration}
                    variant="bordered"
                    onValueChange={setProjectDuration}
                  />
                </div>
              </CardBody>
            </Card>

            {/* Advanced Parameters */}
            <Card className="border shadow-lg bg-content1 border-divider/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-xl font-semibold">Advanced Settings</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-6 pointer-events-auto">
                {/* Survival Rate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Expected Survival Rate
                    </span>
                    <Chip color="primary" size="sm" variant="flat">
                      {survivalRate}%
                    </Chip>
                  </div>
                  <Slider
                    aria-label="Survival Rate"
                    className="w-full"
                    color={survivalRateSliderColor}
                    marks={[
                      { value: 50, label: "50%" },
                      { value: 70, label: "70%" },
                      { value: 85, label: "85%" },
                      { value: 95, label: "95%" },
                    ]}
                    maxValue={95}
                    minValue={50}
                    step={5}
                    value={survivalRate}
                    onChange={handleSurvivalRateChange}
                  />
                  <p className="text-xs text-foreground/70">
                    Percentage of planted vegetation expected to survive and
                    thrive
                  </p>
                </div>

                {/* Biomass Growth Rate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Biomass Growth Conditions
                    </span>
                    <Chip color="success" size="sm" variant="flat">
                      {biomassGrowthRate}%
                    </Chip>
                  </div>
                  <Slider
                    aria-label="Biomass Growth Rate"
                    className="w-full"
                    color={biomassGrowthRateSliderColor}
                    marks={[
                      { value: 70, label: "Poor" },
                      { value: 100, label: "Optimal" },
                      { value: 130, label: "Excellent" },
                    ]}
                    maxValue={130}
                    minValue={70}
                    step={10}
                    value={biomassGrowthRate}
                    onChange={handleBiomassGrowthRateChange}
                  />
                  <p className="text-xs text-foreground/70">
                    Growth rate relative to optimal conditions (climate,
                    nutrients, water quality)
                  </p>
                </div>

                {/* Soil Depth */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Effective Soil Depth
                    </span>
                    <Chip color="secondary" size="sm" variant="flat">
                      {soilDepth} cm
                    </Chip>
                  </div>
                  <Slider
                    aria-label="Soil Depth"
                    className="w-full"
                    color={soilDepthSliderColor}
                    marks={[
                      { value: 20, label: "20cm" },
                      { value: 50, label: "50cm" },
                      { value: 100, label: "100cm" },
                    ]}
                    maxValue={100}
                    minValue={20}
                    step={10}
                    value={soilDepth}
                    onChange={handleSoilDepthChange}
                  />
                  <p className="text-xs text-foreground/70">
                    Depth of carbon-storing soil layer
                  </p>
                </div>

                <Divider />

                {/* Carbon Price */}
                <Input
                  description="Current Indian market: ₹1,000-2,500 per ton CO₂e for blue carbon credits"
                  endContent={
                    <span className="text-sm text-foreground/50">
                      per ton CO₂e
                    </span>
                  }
                  label="Carbon Credit Price"
                  min="500"
                  placeholder="Enter price per ton"
                  startContent={
                    <IndianRupee className="w-4 h-4 text-foreground/50" />
                  }
                  step="50"
                  type="number"
                  value={carbonPriceINR}
                  variant="bordered"
                  onValueChange={setCarbonPriceINR}
                />
              </CardBody>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Main Results Card */}
            <Card className="border shadow-xl bg-gradient-to-br from-success/10 to-primary/10 border-success/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Calculation Results
                    </h2>
                    <p className="text-sm text-foreground/70">
                      Based on current parameters
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-4">
                  {/* Annual Credits */}
                  <div className="p-4 text-center border bg-content1 rounded-xl border-success/20">
                    <div className="mb-2 text-2xl font-bold md:text-3xl text-success">
                      {results.annualCredits.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-foreground/80">
                      tons CO₂e/year
                    </div>
                    <div className="mt-1 text-xs text-foreground/60">
                      Annual Credits
                    </div>
                  </div>

                  {/* Total Credits */}
                  <div className="p-4 text-center border bg-content1 rounded-xl border-primary/20">
                    <div className="mb-2 text-2xl font-bold md:text-3xl text-primary">
                      {results.totalCredits.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-foreground/80">
                      tons CO₂e total
                    </div>
                    <div className="mt-1 text-xs text-foreground/60">
                      Over {projectDuration} years
                    </div>
                  </div>

                  {/* Revenue Potential */}
                  <div className="col-span-2 p-4 text-center border bg-content1 rounded-xl border-warning/20">
                    <div className="mb-2 text-3xl font-bold md:text-4xl text-warning">
                      ₹{results.potentialRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-foreground/80">
                      Potential Revenue (INR)
                    </div>
                    <div className="mt-1 text-xs text-foreground/60">
                      At ₹{carbonPriceINR}/ton CO₂e
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="p-4 mt-6 bg-content2 rounded-xl">
                  <div className="text-center">
                    <div className="mb-2 text-2xl font-bold text-secondary">
                      {results.carsOffRoad.toLocaleString()}
                    </div>
                    <div className="text-sm text-foreground/80">
                      Equivalent to taking cars off road for one year
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Detailed Breakdown */}
            <Card className="border shadow-lg bg-content1 border-divider/50">
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  Carbon Sequestration Breakdown
                </h2>
              </CardHeader>
              <CardBody>
                <Tabs
                  aria-label="Breakdown tabs"
                  color="primary"
                  variant="underlined"
                >
                  <Tab key="annual" title="Annual Analysis">
                    <div className="pt-4 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-content2">
                          <span className="text-sm">
                            Base sequestration rate
                          </span>
                          <span className="font-semibold">
                            {ecosystem.carbonRate.avg} tons/ha/year
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-content2">
                          <span className="text-sm">Project area</span>
                          <span className="font-semibold">{area} hectares</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-content2">
                          <span className="text-sm">
                            Survival rate adjustment
                          </span>
                          <Chip color="primary" size="sm">
                            {survivalRate}%
                          </Chip>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-content2">
                          <span className="text-sm">Growth conditions</span>
                          <Chip color="success" size="sm">
                            {biomassGrowthRate}%
                          </Chip>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-content2">
                          <span className="text-sm">Soil depth factor</span>
                          <Chip color="secondary" size="sm">
                            {Math.min(Number(soilDepth) / 100, 1).toFixed(2)}x
                          </Chip>
                        </div>
                      </div>

                      <Progress
                        aria-label="Utilization of Maximum Potential"
                        className="mt-4"
                        color="success"
                        formatOptions={{ style: "percent" }}
                        showValueLabel={true}
                        value={Math.min(
                          (results.annualCredits /
                            (parseFloat(area) * ecosystem.carbonRate.max)) *
                            100,
                          100,
                        )}
                      />

                      <div className="p-4 mt-4 text-center rounded-lg bg-gradient-to-r from-success/10 to-primary/10">
                        <div className="mb-1 text-2xl font-bold text-success">
                          {results.annualCredits} tons CO₂e/year
                        </div>
                        <div className="text-sm text-foreground/70">
                          {(results.annualCredits / parseFloat(area)).toFixed(
                            1,
                          )}{" "}
                          tons per hectare annually
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="timeline" title="Timeline Projection">
                    <div className="pt-4 space-y-3">
                      {[1, 5, 10, parseInt(projectDuration)]
                        .filter(
                          (year, index, arr) =>
                            arr.indexOf(year) === index &&
                            year <= parseInt(projectDuration),
                        )
                        .map((year) => (
                          <div
                            key={year}
                            className="flex items-center justify-between p-4 border rounded-lg bg-content2 border-divider/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                <span className="text-sm font-bold text-primary">
                                  {year}
                                </span>
                              </div>
                              <span className="font-medium">Year {year}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {(
                                  results.annualCredits * year
                                ).toLocaleString()}{" "}
                                tons
                              </div>
                              <div className="text-sm font-medium text-success">
                                ₹
                                {(
                                  results.annualCredits *
                                  year *
                                  parseFloat(carbonPriceINR)
                                ).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1 font-semibold"
                color="primary"
                size="lg"
                startContent={<Target className="w-5 h-5" />}
                onPress={handleRegisterProject}
              >
                Register This Project
              </Button>
              <Button
                size="lg"
                startContent={<Download className="w-5 h-5" />}
                variant="bordered"
                onPress={handleExportReport}
              >
                Export Report
              </Button>
            </div>

            {/* Enhanced Disclaimer */}
            <Card className="border bg-gradient-to-r from-warning/10 to-danger/10 border-warning/30">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-warning/20">
                    <Info className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-warning">
                      Important Disclaimer
                    </h3>
                    <p className="text-xs leading-relaxed text-foreground/80">
                      These calculations are estimates based on scientific
                      literature and typical project conditions in India. Actual
                      carbon sequestration may vary due to local environmental
                      factors, project implementation, and monitoring
                      methodologies. All projects require professional
                      verification and certification by authorized bodies under
                      the Government of India&apos;s carbon credit framework.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Chip color="warning" size="sm" variant="flat">
                        Estimates Only
                      </Chip>
                      <Chip color="primary" size="sm" variant="flat">
                        Professional Verification Required
                      </Chip>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditCalculator;
