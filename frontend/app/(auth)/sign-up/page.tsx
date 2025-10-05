"use client";

import { AuthBackLink } from "../_components/auth-back-link";
import { AuthWrapper } from "../_components/auth-wrapper";
import { SignUpForm } from "../_components/sign-up-form";

export default function SignUp() {
  return (
    <AuthWrapper
      footerContent={
        <AuthBackLink
          href="/sign-in"
          linkText="Sign in"
          text="Already have an account?"
        />
      }
      showSocials={true}
      subtitle="Join us today!"
      title="Create Account"
    >
      <SignUpForm />
    </AuthWrapper>
  );
}
