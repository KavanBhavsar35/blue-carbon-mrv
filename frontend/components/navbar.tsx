"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Badge } from "@heroui/badge";
import {
  Leaf,
  ChevronDown,
  Database,
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Coins,
  TreePine,
  Shield,
  Bell,
} from "lucide-react";

import { ThemeSwitch } from "./theme-switch";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      name: "Registry",
      items: [
        {
          name: "View Projects",
          icon: <TreePine className="w-4 h-4" />,
          href: "/registry",
        },
        {
          name: "Submit Project",
          icon: <FileText className="w-4 h-4" />,
          href: "/submit",
        },
        {
          name: "Verification Status",
          icon: <Shield className="w-4 h-4" />,
          href: "/verify",
        },
      ],
    },
    {
      name: "Carbon Credits",
      items: [
        {
          name: "My Credits",
          icon: <Coins className="w-4 h-4" />,
          href: "/credits",
        },
        {
          name: "Marketplace",
          icon: <BarChart3 className="w-4 h-4" />,
          href: "/marketplace",
        },
        {
          name: "Transactions",
          icon: <Database className="w-4 h-4" />,
          href: "/transactions",
        },
      ],
    },
    {
      name: "Dashboard",
      items: [
        {
          name: "Analytics",
          icon: <BarChart3 className="w-4 h-4" />,
          href: "/analytics",
        },
        {
          name: "Reports",
          icon: <FileText className="w-4 h-4" />,
          href: "/reports",
        },
        {
          name: "User Management",
          icon: <Users className="w-4 h-4" />,
          href: "/users",
        },
      ],
    },
  ];

  return (
    <>
      {/* Spacer to prevent content jump */}
      <div className="h-20" />

      <HeroUINavbar
        className={`
          fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "w-[95%] max-w-6xl bg-background/80 backdrop-blur-xl border border-divider shadow-lg"
              : "w-[90%] max-w-5xl bg-background/60 backdrop-blur-lg border border-divider/50 shadow-md"
          }
        `}
        classNames={{
          base: "rounded-2xl px-4 py-2",
          wrapper: "px-0 max-w-full",
          content: "gap-6",
          item: "hidden lg:flex",
          toggleIcon: "w-6 h-6",
        }}
        height="auto"
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Brand Section */}
        <NavbarBrand className="gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-foreground">
              Blue<span className="text-primary">Carbon</span>
            </span>
            <span className="text-xs leading-none text-foreground/60">
              Registry
            </span>
          </div>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <NavbarContent className="hidden lg:flex" justify="center">
          {menuItems.map((menu) => (
            <Dropdown key={menu.name} placement="bottom-start">
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent font-medium"
                    endContent={<ChevronDown className="w-4 h-4" />}
                    radius="sm"
                    variant="light"
                  >
                    {menu.name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={`${menu.name} menu`}
                className="w-64"
                itemClasses={{
                  base: "gap-4 py-3",
                }}
              >
                {menu.items.map((item) => (
                  <DropdownItem
                    key={item.name}
                    className="text-foreground hover:text-primary"
                    startContent={item.icon}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ))}

          <NavbarItem>
            <Button
              as="a"
              className="font-medium hover:text-primary"
              href="/about"
              variant="light"
            >
              About
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Right Side - Auth & Notifications */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Badge color="danger" content="3" size="sm">
              <Button
                isIconOnly
                className="text-foreground/60 hover:text-primary"
                variant="light"
              >
                <Bell className="w-5 h-5" />
              </Button>
            </Badge>
          </NavbarItem>

          <NavbarItem className="hidden sm:flex">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform hover:scale-105"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=admin"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="gap-2 h-14">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">admin@bluecarbon.gov.in</p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  startContent={<BarChart3 className="w-4 h-4" />}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings className="w-4 h-4" />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut className="w-4 h-4" />}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem>
            <Button
              className="font-semibold text-white bg-gradient-to-r from-primary to-secondary"
              radius="lg"
              size="sm"
            >
              Register Project
            </Button>
          </NavbarItem>

          <NavbarMenuToggle className="lg:hidden" />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="pt-6 border-t bg-background/95 backdrop-blur-md rounded-b-2xl border-divider">
          <div className="flex flex-col gap-4 px-4">
            {/* Mobile Profile */}
            <div className="flex items-center gap-3 pb-4 border-b border-divider">
              <Avatar size="md" src="https://i.pravatar.cc/150?u=admin" />
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-foreground/60">NCCR Authority</p>
              </div>
            </div>

            {/* Mobile Menu Items */}
            {menuItems.map((menu) => (
              <div key={menu.name} className="space-y-2">
                <p className="text-sm font-semibold text-primary">
                  {menu.name}
                </p>
                {menu.items.map((item) => (
                  <NavbarMenuItem key={item.name}>
                    <Button
                      as="a"
                      className="justify-start w-full gap-3 text-foreground/80"
                      href={item.href}
                      startContent={item.icon}
                      variant="light"
                    >
                      {item.name}
                    </Button>
                  </NavbarMenuItem>
                ))}
              </div>
            ))}

            <div className="pt-4 border-t border-divider">
              <NavbarMenuItem>
                <Button
                  className="w-full font-semibold text-white bg-gradient-to-r from-primary to-secondary"
                  radius="lg"
                >
                  Register Project
                </Button>
              </NavbarMenuItem>
            </div>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </>
  );
};

export default Navbar;
