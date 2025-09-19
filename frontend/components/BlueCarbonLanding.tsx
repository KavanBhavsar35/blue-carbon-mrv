import React from "react";
import { Button } from "@heroui/button";
import {
  ArrowRight,
  Shield,
  Database,
  Zap,
  TreePine,
  Waves,
  Globe,
} from "lucide-react";

const BlueCarbonLanding = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="flex items-center justify-center flex-1 px-6 py-20">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-primary/10 border-primary/20 backdrop-blur-sm">
              <Waves className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Blockchain-Powered Carbon Registry
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl font-heading text-foreground">
                Transform{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  Blue Carbon
                </span>
                <br />
                Projects with Trust
              </h1>

              <p className="max-w-2xl mx-auto text-lg leading-relaxed sm:text-xl text-foreground/70">
                India&apos;s first blockchain-based registry for coastal carbon
                projects. Accelerate verification, ensure transparency, and
                include local communities in the carbon market.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="px-8 py-6 text-lg font-semibold text-white transition-transform bg-gradient-to-r from-primary to-secondary hover:scale-105"
                endContent={<ArrowRight className="w-5 h-5" />}
                radius="full"
                size="lg"
              >
                Register Project
              </Button>

              <Button
                className="px-8 py-6 text-lg font-semibold border-2 hover:bg-foreground/5 backdrop-blur-sm"
                radius="full"
                size="lg"
                variant="bordered"
              >
                View Registry
              </Button>
            </div>

            {/* Stats */}
            <div className="grid max-w-2xl grid-cols-1 gap-8 pt-12 mx-auto sm:grid-cols-3">
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-foreground/60">
                  Hectares Restored
                </div>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-secondary">50,000</div>
                <div className="text-sm text-foreground/60">
                  Tonnes CO₂ Sequestered
                </div>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-foreground/60">
                  Active Projects
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-16 space-y-4 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl font-heading text-foreground">
                Why Choose Our Platform?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-foreground/70">
                Solving the key challenges in blue carbon project verification
                and carbon credit issuance
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Fast Verification */}
              {[
                {
                  icon: <Zap className="w-6 h-6 text-primary" />,
                  title: "Fast Verification",
                  description:
                    "Every project, verification, and carbon credit is permanently recorded on blockchain, preventing fraud and double- counting.",
                },
                {
                  icon: <Shield className="w-6 h-6 text-secondary" />,
                  title: "Immutable Records",
                  description:
                    "Real-time monitoring and immutable records on blockchain ensure every carbon credit is traceable and trustworthy.",
                },
                {
                  icon: <Globe className="w-6 h-6 text-primary" />,
                  title: "Inclusive Access",
                  description:
                    "Enable small communities and panchayats to participate directly in carbon markets through simplified processes.",
                },
                {
                  icon: <Database className="w-6 h-6 text-secondary" />,
                  title: "Smart Contracts",
                  description:
                    "Automated token minting and credit issuance based on verified restoration data, eliminating middlemen costs.",
                },
                {
                  icon: <TreePine className="w-6 h-6 text-primary" />,
                  title: "Blue Carbon Specialist",
                  description:
                    "Purpose-built for mangroves, seagrass, and salt marshes - nature's most effective carbon sinks.",
                },
                {
                  icon: <Shield className="w-6 h-6 text-secondary" />,
                  title: "NCCR Aligned",
                  description:
                    "Designed to integrate with India's Carbon Credit Trading Scheme and national registry standards.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-8 transition-all border pointer-events-auto rounded-2xl bg-background/40 backdrop-blur-sm border-divider hover:border-primary/50 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 transition-transform rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold font-heading">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl font-heading text-foreground">
              Ready to Transform Your Blue Carbon Projects?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/70">
              Join the future of transparent, efficient carbon project
              verification and credit issuance.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="px-8 py-6 text-lg font-semibold text-white transition-transform bg-gradient-to-r from-primary to-secondary hover:scale-105"
                endContent={<ArrowRight className="w-5 h-5" />}
                radius="full"
                size="lg"
              >
                Get Started Today
              </Button>

              <Button
                className="px-8 py-6 text-lg font-semibold hover:bg-foreground/5"
                radius="full"
                size="lg"
                variant="light"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlueCarbonLanding;
