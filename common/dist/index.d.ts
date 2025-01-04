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
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signInType = z.infer<typeof signInSchema>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    profileImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    profileImage?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    profileImage?: string | undefined;
}>;
export type updateUserType = z.infer<typeof updateUserSchema>;
