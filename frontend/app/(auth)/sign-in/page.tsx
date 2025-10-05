"use client";
import { AuthBackLink } from "../_components/auth-back-link";
import { AuthWrapper } from "../_components/auth-wrapper";
import { SignInForm } from "../_components/sign-in-form";

const SignInPage = () => {
  return (
    <AuthWrapper
      footerContent={
        <AuthBackLink
          href="/sign-up"
          linkText="Sign up"
          text="Don't have an account?"
        />
      }
      showSocials={true}
      subtitle="Welcome back!"
      title="Sign In"
    >
      <SignInForm />
    </AuthWrapper>
  );
};

export default SignInPage;
