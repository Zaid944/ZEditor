import z, { TypeOf } from "zod";

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

export const testCaseSchema = z.object({
    image: z.string().optional(),
    input: z.string(),
    output: z.string(),
    explanation: z.string(),
});

export type testCaseType = z.infer<typeof testCaseSchema>;

export const createProblemSchema = z.object({
    title: z.string(),
    description: z.string(),
    problemImage: z.string().optional(),
    sample_tc: z.array(testCaseSchema),
    final_tc: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    topics: z.array(z.string()).optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export type createProblemType = z.infer<typeof createProblemSchema>;

export const updateProblemSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    problemImage: z.string().optional(),
    sample_tc: z.array(testCaseSchema).optional(),
    final_tc: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    topics: z.array(z.string()).optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});

export type updateProblemType = z.infer<typeof updateProblemSchema>;

export const solveProblemSchema = z.object({
    submissions: z.array(
        z.object({
            source_code: z.string(),
            input: z.string(),
            expected_output: z.string(),
            language_id: z.number(),
        })
    ),
});

export type solveProblemType = z.infer<typeof solveProblemSchema>;
