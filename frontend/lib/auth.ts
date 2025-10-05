// File: lib/auth.ts
import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

import { FLASK_BASE_URL } from "./route";

export const auth = betterAuth({
  logger: {
    level: process.env.NODE_ENV === "production" ? "error" : "debug",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  user: {
    modelName: "users",
    fields: {
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  session: {
    modelName: "sessions",
    fields: {
      userId: "user_id",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  account: {
    modelName: "accounts",
    fields: {
      userId: "user_id",
      accessToken: "access_token",
      accessTokenExpiresAt: "access_token_expires_at",
      accountId: "account_id",
      providerId: "provider_id",
      refreshToken: "refresh_token",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      idToken: "id_token",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  verification: {
    modelName: "verifications",
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    customSession(async ({ user, session }) => {
      console.log("Custom session plugin invoked for user:", user);

      try {
        const userData = await fetch(`${FLASK_BASE_URL}/api/users/${user.id}`)
          .then((res) => res.json())
          .then((data) => data)
          .catch((error) => {
            console.error("Failed to fetch user data:", error);

            return { profile: { role: "USER" } }; // Default fallback
          });

        console.log("User data with profile:", userData);

        return {
          user: {
            ...user,
            profile: userData.profile,
          },
          session,
        };
      } catch (error) {
        console.error("Error in custom session:", error);

        return {
          user: {
            ...user,
            profile: { role: "USER" }, // Default fallback
          },
          session,
        };
      }
    }),
    nextCookies(),
  ],
});
