import { authClient } from "@/lib/auth-client";

export const useUser = () => {
  const { data, isPending, refetch } = authClient.useSession();

  const user = data?.user
    ? {
        ...data.user,
        isAdmin: data.user.profile.role.toLowerCase() === "admin",
      }
    : null;

  return {
    user, // fully typed or completely null
    isPending,
    refetch,
    isAuthenticated: !!user,
  };
};
