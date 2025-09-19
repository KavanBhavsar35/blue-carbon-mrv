import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import {
  Mail,
  Phone,
  MapPin,
  Waves,
  TreePine,
  Globe,
  Shield,
  Users,
  Award,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t bg-gradient-to-br from-background via-background to-primary/5 border-divider overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container px-6 py-16 mx-auto sm:px-8 lg:px-12 lg:py-20">
        {/* Top Section - Newsletter & CTA */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
            <CardBody className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Waves className="w-6 h-6 text-primary animate-pulse" />
                    <Chip color="primary" variant="bordered">
                      Stay Connected
                    </Chip>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold font-heading">
                    Join the Blue Carbon Revolution
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Get updates on new projects, policy changes, and
                    breakthrough innovations in coastal ecosystem restoration.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      className="flex-1"
                      classNames={{
                        input: "text-foreground",
                        inputWrapper:
                          "border-primary/30 hover:border-primary focus-within:border-primary bg-background/50 backdrop-blur-sm",
                      }}
                      placeholder="Enter your email address"
                      size="lg"
                      startContent={
                        <Mail className="w-4 h-4 text-foreground/60" />
                      }
                      type="email"
                      variant="bordered"
                    />
                    <Button
                      className="px-8 text-white bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                      color="primary"
                      endContent={<ArrowRight className="w-4 h-4" />}
                      size="lg"
                      variant="solid"
                    >
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/50">
                    Join 5,000+ professionals in the carbon credit ecosystem
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company Info Section - Spans 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-primary font-heading">
                  Blue Carbon Registry
                </h2>
              </div>

              <p className="text-foreground/70 leading-relaxed max-w-md">
                India&apos;s pioneering blockchain-based platform for blue
                carbon project verification and carbon credit trading.
                Empowering coastal communities while combating climate change.
              </p>

              {/* Key Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground/60">
                    Government Aligned & NCCR Certified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TreePine className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-foreground/60">
                    Mangrove, Seagrass & Salt Marsh Specialist
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-foreground/60">
                    Community-driven Carbon Markets
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-foreground/60">
                    Transparent & Verified Credits
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <nav className="flex flex-col space-y-2 text-foreground/70">
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/registry">Registry</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <nav className="flex flex-col space-y-2 text-foreground/70">
              <Link href="/blog">Blog</Link>
              <Link href="/docs">Documentation</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/research">Research</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2 text-foreground/70">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@bluecarbon.org
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Chennai, India
              </p>
            </div>
          </div>
        </div>

        <Divider className="my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
          <p>
            © {new Date().getFullYear()} Blue Carbon Registry. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://github.com" target="_blank">
              <Github className="w-4 h-4" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link href="/docs" target="_blank">
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
