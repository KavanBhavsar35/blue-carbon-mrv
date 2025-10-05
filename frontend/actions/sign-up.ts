"use server";

import { User } from "better-auth/*";
import z from "zod";

import { ActionResponse } from "@/types";
import { RegisterSchema } from "@/schemas";
import { auth } from "@/lib/auth";
import { NEXT_BASE_URL, DEFAULT_REDIRECT_URL } from "@/lib/route";

type SignUpActionOptions = {
  redirectTo?: string;
};

export const signUpAction = async (
  data: z.infer<typeof RegisterSchema>,
  options?: SignUpActionOptions,
): Promise<ActionResponse<User | null> & { redirectTo?: string | null }> => {
  try {
    const safeData = RegisterSchema.safeParse(data);

    if (!safeData.success) {
      return {
        success: false,
        message: "Invalid data input",
        fieldErrors: safeData.error.flatten().fieldErrors,
      };
    }

    const { name, phone, email, password } = safeData.data;

    const newUser = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: options?.redirectTo || DEFAULT_REDIRECT_URL,
      },
    });

    const { user } = newUser;

    if (!user) {
      return {
        success: false,
        message: "Failed to create user",
      };
    }
    console.log("User created:", user);
    // Create user profile with dummy data after successful authentication
    try {
      const userProfileData = {
        user_id: user.id,
        role: "user", // Default role
        wallet_address: "", // Empty for now
        organization: "", // Empty for now
        country: "", // Empty for now
        phone_number: phone || "", // Use provided phone number
        bio: "", // Empty for now
        total_credits_earned: 0.0,
        total_credits_sold: 0.0,
        total_credits_bought: 0.0,
      };

      // Make API call to create user profile
      const response = await fetch(`${NEXT_BASE_URL}/api/user-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfileData),
      });

      if (!response.ok) {
        console.error("Failed to create user profile:", await response.text());
      }
    } catch (profileError) {
      console.error("Error creating user profile:", profileError);
    }

    return {
      success: true,
      message: "Sign-up successful",
      data: user,
      redirectTo: options?.redirectTo || null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unknown error occurred.",
    };
  }
};
