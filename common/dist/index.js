"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.signInSchema = exports.signUpSchema = void 0;
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
