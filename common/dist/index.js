"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveProblemSchema = exports.updateProblemSchema = exports.createProblemSchema = exports.testCaseSchema = exports.updateUserSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(20),
    email: zod_1.default.string().email().min(2).max(100),
    password: zod_1.default.string().min(2).max(20),
    confirmPassword: zod_1.default.string().min(2).max(20),
    profileImage: zod_1.default.string().optional(),
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email().min(2).max(100),
    password: zod_1.default.string().min(2).max(20),
});
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(20).optional(),
    email: zod_1.default.string().email().min(2).max(20).optional(),
    password: zod_1.default.string().min(2).max(20).optional(),
    profileImage: zod_1.default.string().optional(),
});
exports.testCaseSchema = zod_1.default.object({
    image: zod_1.default.string().optional(),
    input: zod_1.default.string(),
    output: zod_1.default.string(),
    explanation: zod_1.default.string(),
});
exports.createProblemSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    problemImage: zod_1.default.string().optional(),
    sample_tc: zod_1.default.array(exports.testCaseSchema),
    final_tc: zod_1.default.string().optional(),
    constraints: zod_1.default.array(zod_1.default.string()).optional(),
    topics: zod_1.default.array(zod_1.default.string()).optional(),
    difficulty: zod_1.default.enum(["EASY", "MEDIUM", "HARD"]),
});
exports.updateProblemSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    problemImage: zod_1.default.string().optional(),
    sample_tc: zod_1.default.array(exports.testCaseSchema).optional(),
    final_tc: zod_1.default.string().optional(),
    constraints: zod_1.default.array(zod_1.default.string()).optional(),
    topics: zod_1.default.array(zod_1.default.string()).optional(),
    difficulty: zod_1.default.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});
exports.solveProblemSchema = zod_1.default.object({
    submissions: zod_1.default.array(zod_1.default.object({
        source_code: zod_1.default.string(),
        input: zod_1.default.string(),
        expected_output: zod_1.default.string(),
        language_id: zod_1.default.number(),
    })),
});
