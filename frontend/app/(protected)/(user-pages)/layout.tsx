import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { LayoutContextProvider } from "../_context/layout-context";

import { auth } from "@/lib/auth";
import { DEFAULT_REDIRECT_URL } from "@/lib/route";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("UserLayout session:", session);
  if (
    !session ||
    !session.user ||
    (session.user.profile.role.toLowerCase() !== "user" &&
      session.user.profile.role.toLowerCase() !== "admin")
  ) {
    redirect(DEFAULT_REDIRECT_URL);
  }

  return <LayoutContextProvider>{children}</LayoutContextProvider>;
};

export default UserLayout;
