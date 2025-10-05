import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
  TreePine,
  Users,
  Building,
  Building2,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  Coins,
  ArrowRight,
  Info,
  Award,
  Globe,
} from "lucide-react";

interface GetStartedProps {
  onGetStarted: () => void;
  canGoNext: boolean;
  isValidating?: boolean;
}

const GetStartedComponent: React.FC<GetStartedProps> = ({
  onGetStarted,
  canGoNext,
  isValidating,
}) => {
  const organizationTypes = [
    {
      type: "NGO",
      icon: <Users className="w-6 h-6" />,
      description:
        "Non-governmental organizations focused on environmental restoration",
      examples: "Environmental foundations, conservation societies",
      color: "success",
    },
    {
      type: "Panchayat",
      icon: <Building className="w-6 h-6" />,
      description:
        "Local government bodies implementing coastal protection projects",
      examples: "Village, block, or district panchayats",
      color: "primary",
    },
    {
      type: "Community",
      icon: <TreePine className="w-6 h-6" />,
      description: "Local community groups and fishing cooperatives",
      examples: "SHGs, fishing cooperatives, community groups",
      color: "secondary",
    },
    {
      type: "Company",
      icon: <Building2 className="w-6 h-6" />,
      description: "Private enterprises investing in blue carbon projects",
      examples: "CSR initiatives, environmental consulting firms",
      color: "warning",
    },
  ];

  const benefits = [
    {
      title: "Verified Carbon Credits",
      description:
        "Earn blockchain-secured carbon credits for measurable CO₂ sequestration",
      icon: <Coins className="w-5 h-5" />,
      color: "success",
    },
    {
      title: "Fast-Track Approval",
      description:
        "Digital verification process reduces approval time from months to weeks",
      icon: <Clock className="w-5 h-5" />,
      color: "primary",
    },
    {
      title: "Transparency & Trust",
      description:
        "Immutable blockchain records ensure project authenticity and impact tracking",
      icon: <Shield className="w-5 h-5" />,
      color: "secondary",
    },
    {
      title: "Community Impact",
      description:
        "Support local livelihoods while restoring critical coastal ecosystems",
      icon: <Globe className="w-5 h-5" />,
      color: "warning",
    },
  ];

  const requirements = [
    "Legal permission or land rights for the project area",
    "Basic project details (location, area, timeline)",
    "Organization information and contact details",
    "Commitment to follow MRV protocols",
  ];

  const processSteps = [
    { step: 1, title: "Register", description: "Complete project application" },
    { step: 2, title: "Review", description: "NCCR verification process" },
    { step: 3, title: "Approve", description: "Project gets approved" },
    { step: 4, title: "Implement", description: "Start restoration work" },
    { step: 5, title: "Earn", description: "Receive carbon credits" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 dark:from-background dark:via-content1 dark:to-content2 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 flex flex-col items-center">
          <div className="flex justify-center">
            <div className="p-5 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-md">
              <TreePine className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Register Your Blue Carbon Project
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Join India&apos;s largest coastal restoration initiative. Restore
            mangroves, seagrass, and salt marshes while earning verified carbon
            credits through our blockchain-powered platform.
          </p>
          <Button
            className="min-w-60 py-4 text-lg rounded-2xl font-bold flex items-center justify-center gap-2"
            color="primary"
            disabled={!canGoNext}
            endContent={
              <ArrowRight
                className="w-6 h-6 animate-bounce-horizontal"
                style={{
                  animation: "bounce-horizontal 1s infinite",
                }}
              />
            }
            isLoading={isValidating}
            size="lg"
            onPress={onGetStarted}
          >
            Get Started
          </Button>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <style jsx>{`
            @keyframes bounce-horizontal {
              0%,
              100% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(8px);
              }
            }
          `}</style>
        </div>

        {/* Who Can Apply */}
        <Card className="bg-white/90 dark:bg-background/80 backdrop-blur-md border border-divider/50 shadow-sm rounded-2xl">
          <CardHeader className="pb-4">
            <div>
              <h2 className="text-2xl font-bold">Who Can Register?</h2>
              <p className="text-foreground/70 mt-2">
                We welcome applications from various organizations committed to
                coastal restoration
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {organizationTypes.map((org, index) => (
                <Card
                  key={index}
                  className={`p-6 rounded-xl border border-${org.color}/30 bg-${org.color}/5 hover:bg-${org.color}/10 transition-all shadow-sm`}
                >
                  <div className={`flex justify-center mb-4 text-${org.color}`}>
                    <div className={`p-3 bg-${org.color}/10 rounded-xl`}>
                      {org.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{org.type}</h3>
                  <p className="text-sm text-foreground/80 mb-2">
                    {org.description}
                  </p>
                  <p className="text-xs text-foreground/60">{org.examples}</p>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Benefits & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <Card className="bg-white/90 dark:bg-background/80 backdrop-blur-md border border-divider/50 shadow-sm rounded-2xl">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Why Join Our Platform?
              </h2>
            </CardHeader>
            <CardBody className="space-y-5">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`p-3 bg-${benefit.color}/10 rounded-lg text-${benefit.color} flex-shrink-0`}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Requirements */}
          <Card className="bg-white/90 dark:bg-background/80 backdrop-blur-md border border-divider/50 shadow-sm rounded-2xl">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-6 h-6 text-warning" />
                What You&apos;ll Need
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/80 leading-snug">
                    {requirement}
                  </p>
                </div>
              ))}
              <Divider className="my-6" />
              <div className="p-4 bg-info/10 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-info" />
                  <span className="text-sm font-semibold text-info">
                    Good to Know
                  </span>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Don&apos;t worry if you don&apos;t have all documents ready.
                  You can submit your application and upload supporting
                  documents during the review process.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Process Overview */}
        <Card className="bg-white/90 dark:bg-background/80 backdrop-blur-md border border-divider/50 shadow-sm rounded-2xl">
          <CardHeader>
            <div>
              <h2 className="text-2xl font-bold">Registration Process</h2>
              <p className="text-foreground/70 mt-1">
                Simple 5-step process from application to earning credits
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm">
                      <span className="text-primary font-bold text-lg">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-foreground/70 max-w-24 mx-auto">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-foreground/30 mx-6 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Join the movement to restore India&apos;s coastal ecosystems.
              Every hectare matters in the fight against climate change.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button
              className="font-semibold min-w-52 py-3 text-base rounded-xl shadow-md"
              color="primary"
              disabled={!canGoNext}
              endContent={<ArrowRight className="w-5 h-5" />}
              isLoading={isValidating}
              size="lg"
              onPress={onGetStarted}
            >
              Start Registration
            </Button>
            <Button
              as="a"
              className="min-w-52 py-3 text-base rounded-xl"
              color="secondary"
              href="/about"
              size="lg"
              variant="flat"
            >
              Learn More About Blue Carbon
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>~10 minutes to complete</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Secure & verified</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>No upfront costs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedComponent;
