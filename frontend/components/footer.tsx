import React from "react";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import {
  Mail,
  Phone,
  MapPin,
  TreePine,
  Globe,
  Shield,
  Users,
  Award,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t bg-gradient-to-br from-background via-background to-primary/5 border-divider">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl" />
        <div className="absolute top-0 right-0 rounded-full w-72 h-72 bg-gradient-to-r from-secondary/10 to-primary/10 blur-3xl" />
      </div>

      <div className="container relative px-6 py-16 mx-auto sm:px-8 lg:px-12 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company Info Section - Spans 2 columns */}
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-primary font-heading">
                  Blue Carbon Registry
                </h2>
              </div>

              <p className="max-w-md leading-relaxed text-foreground/70">
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
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row text-foreground/50">
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
