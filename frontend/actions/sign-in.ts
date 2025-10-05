"use server";

import { z } from "zod";

import { LoginSchema } from "@/schemas";
import { auth } from "@/lib/auth";
import { ActionResponse, User } from "@/types";
import { NEXT_BASE_URL } from "@/lib/route";

type SignInActionOptions = {
  redirectTo?: string;
};

interface FlaskUserLookupResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const signInAction = async (
  data: z.infer<typeof LoginSchema>,
  options?: SignInActionOptions,
): Promise<ActionResponse<User | null> & { redirectTo?: string | null }> => {
  try {
    // Validate input data
    const safeData = LoginSchema.safeParse(data);

    if (!safeData.success) {
      return {
        success: false,
        message: "Invalid input data",
        fieldErrors: safeData.error.flatten().fieldErrors,
      };
    }

    const { email, password } = safeData.data;

    // First, check if user exists using the lookup endpoint
    const userLookupUrl = `${NEXT_BASE_URL}/api/users/lookup?email=${encodeURIComponent(email)}`;

    try {
      const lookupResponse = await fetch(userLookupUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const lookupData: FlaskUserLookupResponse = await lookupResponse.json();

      if (!lookupResponse.ok || !lookupData.success) {
        return {
          success: false,
          message: "User not found",
          fieldErrors: {
            email: ["User with this email does not exist"],
          },
        };
      }

      console.log("User lookup successful:", lookupData);
      // } catch (lookupError) {
      //   console.error("User lookup error:", lookupError);

      //   return {
      //     success: false,
      //     message: "Error checking user existence",
      //   };
      // }

      // try {
      const betterAuthResponse = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        asResponse: true,
      });

      if (!betterAuthResponse.ok) {
        // If Better Auth fails but Flask succeeds, there might be a sync issue
        console.warn("Flask auth succeeded but Better Auth failed");

        return {
          success: false,
          message: "Authentication service error",
        };
      }

      return {
        success: true,
        message: "Successfully signed in",
        data: lookupData.data as User,
        redirectTo: options?.redirectTo || null,
      };
    } catch (authError) {
      console.error("Flask authentication error:", authError);

      return {
        success: false,
        message: "Authentication service unavailable",
      };
    }
  } catch (error: any) {
    console.error("Sign-in action error:", error);

    return {
      success: false,
      message: error.message || "An unexpected error occurred during sign-in",
    };
  }
};

// // Additional helper function to sync user data from Flask to Better Auth if needed
// export const syncUserWithBetterAuth = async (userData: any) => {
//   try {
//     // This would be used if you need to ensure Better Auth has the user data
//     // Implementation depends on your Better Auth setup
//     console.log("User data from Flask:", userData);

//     return userData;
//   } catch (error) {
//     console.error("Error syncing user data:", error);
//     throw error;
//   }
// };

// // Helper function to validate email format before making requests
// export const validateEmailFormat = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   return emailRegex.test(email);
//
// };
