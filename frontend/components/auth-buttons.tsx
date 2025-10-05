// File: components/auth-buttons.tsx
"use client";

import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import React from "react";
import { LogOut, Settings, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export const AuthButtons = ({
  className = "",
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
}) => {
  const orientationClass =
    orientation === "vertical"
      ? "flex flex-col items-start gap-3 w-full"
      : "flex items-center gap-3";
  const allClasses = `${orientationClass} ${className}`;

  const { isPending, data: session } = authClient.useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  if (isPending) {
    return (
      <div className={allClasses}>
        <div className="flex items-center justify-center p-2">
          <Spinner className="animate-spin" color="primary" size="sm" />
        </div>
      </div>
    );
  }

  if (!session) return;

  return (
    <div className={`${allClasses} pointer-events-auto`}>
      <Dropdown offset={10} placement="bottom-end" showArrow={true}>
        <DropdownTrigger>
          <Avatar
            showFallback
            className="transition-all duration-200 ring-2 ring-primary/20 hover:ring-primary/40"
            name={session.user.name || session.user.email || "User"}
            size="sm"
            src={session.user.image || undefined}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={(key) => {
            switch (key) {
              case "dashboard":
                handleNavigation("/dashboard");
                break;
              case "settings":
                handleNavigation("/settings");
                break;
              case "logout":
                handleSignOut();
                break;
              default:
                break;
            }
          }}
        >
          <DropdownItem
            key="profile"
            className="gap-2 h-14"
            textValue="Profile"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">
              {" "}
              {session.user.email}
              {
                // session.session.
              }
            </p>
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            className="text-foreground hover:text-primary transition-colors"
            startContent={<BarChart3 className="w-4 h-4" />}
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="settings"
            className="text-foreground hover:text-primary transition-colors"
            startContent={<Settings className="w-4 h-4" />}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger hover:text-danger-600 transition-colors"
            color="danger"
            startContent={<LogOut className="w-4 h-4" />}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
