import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email must be a string" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string({ invalid_type_error: "Email must be a string" })
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^\d+$/, { message: "Phone number must be digits only" })
      .max(10, { message: "Phone number must be 10 digits" }),
    password: z
      .string()
      .min(6, { message: "Minimum 6 characters required" })
      .refine(
        (password) => {
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasNumber = /[0-9]/.test(password);
          const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

          return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        },
        {
          message:
            "Password must include uppercase, lowercase, number and special character",
        },
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Show the error on the confirmPassword field
  });

export const PostCommentSchema = z.object({
  postId: z.string().min(1, { message: "Post ID is required" }),
  content: z.string().min(1, { message: "Comment content is required" }),
});
