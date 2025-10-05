import React, { useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { createAuthClient } from "better-auth/client";

import { GoogleIcon } from "@/components/icons";
import { Clock } from "lucide-react";

export const OAuthButton = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const authClient = createAuthClient();
  const onPress = async () => {
    if (isDisabled) return;
    setIsDisabled(true);
    try {
      // const signIn = async () => {
      //   const data = await authClient.signIn.social({
      //     provider: "google",
      //   });

      //   console.log("Google sign-in data:", data);
      // };

      // await signIn();

      addToast({
        title: "Work in Progress",
        description: "Google OAuth is coming soon!",
        color: "default",
        timeout: 3000,
        icon: <Clock size={16} />,
      });
    } catch (error) {
      // console.error("Error signing in with Google:", error);
      addToast({
        title: "Sign In Error",
        description: "An error occurred while signing in with Google.",
        color: "danger",
        timeout: 3000,
      });
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex flex-row justify-center w-full gap-4">
      <Button
        className="flex-1"
        isDisabled={isDisabled}
        isLoading={isDisabled}
        startContent={<GoogleIcon />}
        variant="solid"
        onPress={onPress}
      >
        Google
      </Button>
    </div>
  );
};
