import z from "zod";
export declare const signUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    profileImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string | undefined;
}>;
export type signUpType = z.infer<typeof signUpSchema>;
