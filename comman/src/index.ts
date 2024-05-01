import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const createBLogInput = z.object({
    title: z.string(),
    content: z.string(),
    date: z.string(),
});

export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBLogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
