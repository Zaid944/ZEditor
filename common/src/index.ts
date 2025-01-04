import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2).max(20),
    email: z.string().email().min(2).max(100),
    password: z.string().min(2).max(20),
    confirmPassword: z.string().min(2).max(20),
    profileImage: z.string().optional(),
});

export type signUpType = z.infer<typeof signUpSchema>;
