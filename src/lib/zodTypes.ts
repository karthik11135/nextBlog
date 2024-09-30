import z from "zod";

const invalidInputs = {
  invalid_type_error: "Invalid input"
}

export const signupSchema = z.object({
  name: z.string(invalidInputs).min(4).max(10),
  email: z.string(invalidInputs).email(),
  password: z.string(invalidInputs).min(5),
});

export const loginSchema = z.object({
  email: z.string(invalidInputs).email(),
  password: z.string(invalidInputs),
});

export const blogSchema = z.object({
  title: z.string(invalidInputs),
  content: z.string(invalidInputs),
});

export type signupType = z.infer<typeof signupSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type blogType = z.infer<typeof blogSchema>;
