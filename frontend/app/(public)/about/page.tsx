import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  TreePine,
  Waves,
  Shield,
  Users,
  Globe,
  Target,
  Award,
  MapPin,
  Clock,
  TrendingUp,
  Building,
  CheckCircle,
  ArrowRight,
  FileText,
  Coins,
  Activity,
  Heart,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@heroui/progress";

import { IndiaMap } from "@/components/ui/india-map";

const AboutPage = () => {
  const impactStats = [
    {
      label: "Coastal Hectares Protected",
      value: "2,500+",
      icon: <TreePine className="w-6 h-6" />,
    },
    {
      label: "Carbon Credits Generated",
      value: "50,000+",
      icon: <Coins className="w-6 h-6" />,
    },
    {
      label: "Communities Engaged",
      value: "150+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Organizations Onboarded",
      value: "75+",
      icon: <Building className="w-6 h-6" />,
    },
  ];

  const ecosystems = [
    {
      name: "Mangrove Forests",
      description:
        "Nature's coastal guardians that store 3-5 times more carbon than terrestrial forests while protecting communities from storms and erosion.",
      carbonCapacity: "25-35 tons CO₂/hectare/year",
      coverage:
        "India has 4,975 km² of mangrove cover across 12 coastal states",
      icon: <TreePine className="w-8 h-8" />,
      color: "success" as const,
    },
    {
      name: "Seagrass Meadows",
      description:
        "Underwater carbon sinks that support marine biodiversity while sequestering carbon in their extensive root systems and sediments.",
      carbonCapacity: "15-25 tons CO₂/hectare/year",
      coverage: "Over 3,000 km² of seagrass beds along Indian coastline",
      icon: <Waves className="w-8 h-8" />,
      color: "primary" as const,
    },
    {
      name: "Salt Marshes",
      description:
        "Tidal wetlands that act as natural buffers against sea-level rise while storing carbon in their waterlogged soils for centuries.",
      carbonCapacity: "20-30 tons CO₂/hectare/year",
      coverage:
        "Extensive salt marshes in Gujarat, West Bengal, and other coastal regions",
      icon: <MapPin className="w-8 h-8" />,
      color: "secondary" as const,
    },
  ];

  const features = [
    {
      title: "Blockchain-Verified Credits",
      description:
        "Every carbon credit is immutably recorded on the blockchain, ensuring transparency and preventing double-counting. Smart contracts automate verification and issuance.",
      icon: <Shield className="w-6 h-6" />,
      color: "primary" as const,
    },
    {
      title: "Digital MRV System",
      description:
        "Advanced Measurement, Reporting, and Verification using IoT sensors, satellite imagery, and AI analytics to monitor project progress in real-time.",
      icon: <Activity className="w-6 h-6" />,
      color: "success" as const,
    },
    {
      title: "Community-Centric Approach",
      description:
        "Empowering local communities, panchayats, and NGOs to participate directly in coastal restoration while ensuring equitable benefit distribution.",
      icon: <Heart className="w-6 h-6" />,
      color: "danger" as const,
    },
    {
      title: "Regulatory Compliance",
      description:
        "Aligned with India's Carbon Credit Trading Scheme (CCTS) and international blue carbon standards for seamless integration with national markets.",
      icon: <FileText className="w-6 h-6" />,
      color: "warning" as const,
    },
  ];

  const challenges = [
    {
      problem: "Lengthy Verification Process",
      solution:
        "6-9 month verification reduced to 2-4 weeks through digital automation",
      improvement: "85% faster processing",
    },
    {
      problem: "High Transaction Costs",
      solution:
        "Blockchain technology reduces intermediary fees from 30% to 5%",
      improvement: "25% cost reduction",
    },
    {
      problem: "Limited Community Access",
      solution:
        "Mobile-first platform enables rural participation with offline capabilities",
      improvement: "300% increase in small-holder participation",
    },
    {
      problem: "Lack of Transparency",
      solution:
        "Open blockchain ledger provides full project traceability and impact tracking",
      improvement: "100% transparency guarantee",
    },
  ];

  const timeline = [
    {
      phase: "Research & Development",
      period: "2023-2024",
      status: "completed",
      description:
        "Extensive research on blue carbon ecosystems, blockchain integration, and regulatory frameworks in partnership with NCCR and leading marine research institutions.",
    },
    {
      phase: "Platform Development",
      period: "2024",
      status: "in-progress",
      description:
        "Building the comprehensive digital platform with advanced MRV capabilities, smart contract integration, and user-friendly interfaces for all stakeholders.",
    },
    {
      phase: "Pilot Projects Launch",
      period: "Q2 2024",
      status: "upcoming",
      description:
        "Initial deployment with select NGOs and panchayats across Gujarat, West Bengal, and Tamil Nadu to validate technology and processes.",
    },
    {
      phase: "National Scaling",
      period: "Q4 2024",
      status: "upcoming",
      description:
        "Full-scale rollout across all coastal states with integration into India's national carbon trading infrastructure and international markets.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 dark:from-background dark:via-content1 dark:to-content2">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white rounded-b-2xl bg-gradient-to-r from-blue-600 via-green-600 to-teal-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative px-6 py-24 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-lg">
                <TreePine className="w-16 h-16" />
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Restoring India&apos;s Blue Carbon Ecosystems
            </h1>
            <p className="max-w-4xl mx-auto mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
              The world&apos;s first blockchain-powered registry for coastal
              ecosystem restoration, empowering communities to fight climate
              change while earning verified carbon credits
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                className="font-semibold"
                color="secondary"
                size="lg"
                variant="solid"
              >
                Explore Our Impact
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                className="text-white border-white hover:bg-white/10"
                size="lg"
                variant="bordered"
              >
                Register Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-16 mx-auto max-w-7xl">
        {/* Impact Statistics */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Growing Impact</h2>
            <p className="max-w-3xl mx-auto text-lg text-foreground/70">
              Since our inception, we&apos;ve been driving measurable change in
              coastal ecosystem restoration and carbon sequestration across
              India&apos;s vast coastline.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border border-divider/50 bg-white/60 dark:bg-background/60 backdrop-blur-sm"
              >
                <CardBody className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="mb-2 text-3xl font-bold text-primary">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-foreground/70">{stat.label}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* The Blue Carbon Challenge */}
        <Card className="mb-20 border border-blue-200 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 dark:border-blue-800">
          <CardBody className="p-12">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-4xl font-bold">
                The Blue Carbon Opportunity
              </h2>
              <p className="max-w-4xl mx-auto text-lg leading-relaxed text-foreground/80">
                Coastal ecosystems cover less than 2% of the ocean but account
                for 50% of carbon sequestration in marine sediments.
                India&apos;s 7,500 km coastline holds immense potential to
                combat climate change while protecting vulnerable communities.
              </p>
            </div>

            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-danger/10">
                    <TrendingUp className="w-6 h-6 text-danger" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">
                      Climate Crisis Reality
                    </h3>
                    <p className="text-sm text-foreground/70">
                      India faces severe coastal erosion, sea-level rise, and
                      extreme weather events. Over 40% of mangrove cover has
                      been lost in the past 50 years.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Urgent Action Needed</h3>
                    <p className="text-sm text-foreground/70">
                      The next decade is critical for coastal ecosystem
                      restoration. Every hectare restored can sequester 25-35
                      tons of CO₂ annually.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Target className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Scalable Solution</h3>
                    <p className="text-sm text-foreground/70">
                      Technology-enabled restoration can scale rapidly while
                      ensuring transparency, community participation, and
                      measurable impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border border-success-200 bg-success-50 dark:bg-success-950/20">
                  <CardBody className="p-6">
                    <div className="text-center">
                      <Globe className="w-12 h-12 mx-auto mb-4 text-success" />
                      <h3 className="mb-2 text-xl font-bold">
                        India&apos;s Blue Carbon Potential
                      </h3>
                      <p className="mb-4 text-sm">
                        Restoring 1 million hectares could sequester
                      </p>
                      <div className="text-3xl font-bold text-success">
                        25 million tons
                      </div>
                      <p className="text-sm text-foreground/70">
                        of CO₂ annually
                      </p>
                    </div>
                  </CardBody>
                </Card>

                <div className="p-6 text-center rounded-lg bg-white/50 dark:bg-background/50">
                  <p className="mb-2 text-sm text-foreground/70">
                    Equivalent to removing
                  </p>
                  <div className="text-2xl font-bold text-primary">
                    5.4 million cars
                  </div>
                  <p className="text-sm text-foreground/70">
                    from Indian roads every year
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Blue Carbon Ecosystems */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Understanding Blue Carbon Ecosystems
            </h2>
            <p className="max-w-4xl mx-auto text-lg text-foreground/70">
              These coastal powerhouses are among nature&apos;s most effective
              carbon sinks, storing carbon at rates far exceeding terrestrial
              forests while providing crucial ecosystem services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-2">
            {/* Left Side - India Map */}
            <div>
              <IndiaMap
                dots={[
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 19.076, lng: 72.8777 }, // Mumbai
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 13.0827, lng: 80.2707 }, // Chennai
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 22.5726, lng: 88.3639 }, // Kolkata
                  },
                  {
                    start: { lat: 19.076, lng: 72.8777 }, // Mumbai
                    end: { lat: 12.9716, lng: 77.5946 }, // Bangalore
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 15.2993, lng: 74.124 }, // Goa
                  },
                  {
                    start: { lat: 19.076, lng: 72.8777 }, // Mumbai
                    end: { lat: 17.385, lng: 78.4867 }, // Hyderabad
                  },
                ]}
                lineColor="#3b82f6"
              />
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardBody>
                  <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    Our Mission
                  </h2>
                  <p className="mb-4 text-gray-600">
                    We&apos;re building India&apos;s most transparent and
                    efficient carbon credit marketplace by leveraging
                    cutting-edge technology to connect project developers with
                    conscious investors.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            {ecosystems.map((ecosystem, index) => (
              <Card
                key={index}
                className="border border-divider/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm"
              >
                <CardBody className="p-8">
                  <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`p-3 bg-${ecosystem.color}/10 rounded-xl text-${ecosystem.color}`}
                        >
                          {ecosystem.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{ecosystem.name}</h3>
                      </div>
                      <p className="mb-6 leading-relaxed text-foreground/80">
                        {ecosystem.description}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {ecosystem.coverage}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Card
                        className={`border border-${ecosystem.color}-200 bg-${ecosystem.color}/5`}
                      >
                        <CardBody className="p-4 text-center">
                          <div className="mb-1 text-sm text-foreground/70">
                            Carbon Sequestration Rate
                          </div>
                          <div
                            className={`text-lg font-bold text-${ecosystem.color}`}
                          >
                            {ecosystem.carbonCapacity}
                          </div>
                        </CardBody>
                      </Card>

                      <div className="flex gap-2">
                        <Chip color={ecosystem.color} size="sm" variant="flat">
                          High Impact
                        </Chip>
                        <Chip color="default" size="sm" variant="flat">
                          Scalable
                        </Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Revolutionary Technology Platform
            </h2>
            <p className="max-w-4xl mx-auto text-lg text-foreground/70">
              Our comprehensive digital ecosystem combines cutting-edge
              blockchain technology, IoT monitoring, and community engagement
              tools to revolutionize coastal restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-all duration-300 border border-divider/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm group hover:shadow-lg"
              >
                <CardBody className="p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 bg-${feature.color}/10 rounded-xl text-${feature.color} group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3 text-xl font-bold">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-foreground/80">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Solving Industry Challenges */}
        <Card className="mb-20 border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 dark:border-orange-800">
          <CardBody className="p-12">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-4xl font-bold">
                Solving Critical Industry Challenges
              </h2>
              <p className="max-w-4xl mx-auto text-lg text-foreground/80">
                The traditional carbon credit market faces significant
                inefficiencies. Our platform directly addresses these pain
                points with innovative solutions.
              </p>
            </div>

            <div className="space-y-8">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="grid items-center grid-cols-1 gap-6 lg:grid-cols-3"
                >
                  <Card className="border bg-danger/5 border-danger/20">
                    <CardBody className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-danger" />
                        <span className="text-sm font-semibold tracking-wide uppercase text-danger">
                          Problem
                        </span>
                      </div>
                      <p className="text-sm">{challenge.problem}</p>
                    </CardBody>
                  </Card>

                  <div className="flex justify-center">
                    <ArrowRight className="w-8 h-8 text-foreground/30" />
                  </div>

                  <Card className="border bg-success/5 border-success/20">
                    <CardBody className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="text-sm font-semibold tracking-wide uppercase text-success">
                          Solution
                        </span>
                      </div>
                      <p className="mb-3 text-sm">{challenge.solution}</p>
                      <Chip color="success" size="sm" variant="flat">
                        {challenge.improvement}
                      </Chip>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Development Timeline */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold">Our Development Journey</h2>
            <p className="max-w-3xl mx-auto text-lg text-foreground/70">
              From research to nationwide implementation, here&apos;s how
              we&apos;re building the future of blue carbon restoration in
              India.
            </p>
          </div>

          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <Card
                key={index}
                className={`border ${phase.status === "completed"
                    ? "border-success/50 bg-success/5"
                    : phase.status === "in-progress"
                      ? "border-primary/50 bg-primary/5"
                      : "border-divider/50 bg-white/50 dark:bg-background/50"
                  }`}
              >
                <CardBody className="p-8">
                  <div className="flex items-start gap-6">
                    <div
                      className={`p-3 rounded-full ${phase.status === "completed"
                          ? "bg-success text-white"
                          : phase.status === "in-progress"
                            ? "bg-primary text-white"
                            : "bg-content3 text-foreground/50"
                        }`}
                    >
                      {phase.status === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : phase.status === "in-progress" ? (
                        <Activity className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold">{phase.phase}</h3>
                        <Chip
                          color={
                            phase.status === "completed"
                              ? "success"
                              : phase.status === "in-progress"
                                ? "primary"
                                : "default"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {phase.period}
                        </Chip>
                      </div>
                      <p className="leading-relaxed text-foreground/80">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-white bg-gradient-to-r from-primary to-secondary">
          <CardBody className="p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Join the Blue Carbon Revolution
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-blue-100">
              Whether you&apos;re an NGO, panchayat, community group, or
              company, you can be part of India&apos;s largest coastal
              restoration initiative. initiative.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="font-semibold" color="secondary" size="lg">
                Register Your Project
                <TreePine className="w-5 h-5 ml-2" />
              </Button>
              <Button
                className="text-white border-white hover:bg-white/10"
                size="lg"
                variant="bordered"
              >
                Learn More About Blue Carbon
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 mt-12 text-center md:grid-cols-3">
              <div>
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="mb-2 text-lg font-semibold">For Communities</h3>
                <p className="text-sm text-blue-100">
                  Earn carbon credits while protecting your coastal heritage
                </p>
              </div>
              <div>
                <Building className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="mb-2 text-lg font-semibold">
                  For Organizations
                </h3>
                <p className="text-sm text-blue-100">
                  Scale your environmental impact with verified blue carbon
                  projects
                </p>
              </div>
              <div>
                <Award className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="mb-2 text-lg font-semibold">For Investors</h3>
                <p className="text-sm text-blue-100">
                  Support transparent, blockchain-verified climate solutions
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
