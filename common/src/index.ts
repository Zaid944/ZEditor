import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2).max(20),
    email: z.string().email().min(2).max(100),
    password: z.string().min(2).max(20),
    confirmPassword: z.string().min(2).max(20),
    profileImage: z.string().optional(),
});

export type signUpType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.string().email().min(2).max(100),
    password: z.string().min(2).max(20),
});

export type signInType = z.infer<typeof signInSchema>;

export const updateUserSchema = z.object({
    name: z.string().min(2).max(20).optional(),
    email: z.string().email().min(2).max(20).optional(),
    password: z.string().min(2).max(20).optional(),
    profileImage: z.string().optional(),
});

export type updateUserType = z.infer<typeof updateUserSchema>;
