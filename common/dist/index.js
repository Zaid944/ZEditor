"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInToastMode = exports.solveProblemHelperSchema = exports.readFileSchema = exports.solveProblemSchema = exports.updateProblemSchema = exports.createProblemSchema = exports.Difficulty = exports.testCaseSchema = exports.updateUserSchema = exports.signInSchema = exports.signUpSchema = void 0;
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
exports.Difficulty = zod_1.default.enum(["EASY", "MEDIUM", "HARD"]);
exports.createProblemSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    problemImage: zod_1.default.string().optional(),
    sample_tc: zod_1.default.array(exports.testCaseSchema),
    final_tc: zod_1.default.string().optional(),
    constraints: zod_1.default.array(zod_1.default.string()).optional(),
    topics: zod_1.default.array(zod_1.default.string()).optional(),
    difficulty: exports.Difficulty,
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
exports.readFileSchema = zod_1.default.object({
    url: zod_1.default.string(),
});
exports.solveProblemHelperSchema = zod_1.default.object({
    url: zod_1.default.string(),
    source_code: zod_1.default.string(),
    language_id: zod_1.default.number(),
});
var SignInToastMode;
(function (SignInToastMode) {
    SignInToastMode[SignInToastMode["REQ_BODY_NOT_VALIDATED"] = 0] = "REQ_BODY_NOT_VALIDATED";
    SignInToastMode[SignInToastMode["USER_NOT_FOUND"] = 1] = "USER_NOT_FOUND";
    SignInToastMode[SignInToastMode["USER_SIGNED_IN"] = 2] = "USER_SIGNED_IN";
    SignInToastMode[SignInToastMode["PASSWORD_NOT_VALIDATED"] = 3] = "PASSWORD_NOT_VALIDATED";
    SignInToastMode[SignInToastMode["INTERNAL_SERVER_ERROR"] = 4] = "INTERNAL_SERVER_ERROR";
})(SignInToastMode || (exports.SignInToastMode = SignInToastMode = {}));
