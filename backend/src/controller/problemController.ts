import dotenv from "dotenv";
import {
    createProblemSchema,
    updateProblemSchema,
    solveProblemSchema,
    problemType,
} from "@zeditor/common";
import {
    CREATE_PROBLEM,
    UPDATE_PROBLEM,
    SOLVE_PROBLEM,
} from "../common/constants";
import { StatusCodes } from "@zeditor/common";
import { problemModel } from "../model/problemModel";
import {
    Judge0Submit_GET,
    Judge0Submit_POST,
} from "../common/problem_execution/Judge0";
import { ZodError } from "zod";
import { Document } from "mongoose";

dotenv.config();

export function isZodError(err: unknown): err is ZodError {
    return Boolean(
        err &&
            (err instanceof ZodError || (err as ZodError).name === "ZodError")
    );
}

export async function createProblem(req: any, res: any) {
    console.log("reached create problem");
    try {
        const validate = createProblemSchema.safeParse(req.body);
        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: `${CREATE_PROBLEM} req body is not validated`,
            });
        }

        const problem = await problemModel.create(req.body);
        return res.status(StatusCodes.SUCCESS).json({
            msg: `${CREATE_PROBLEM} problem created successfully`,
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: `${CREATE_PROBLEM} problem not created`,
            err,
        });
    }
}

export async function updateProblem(req: any, res: any) {
    try {
        const validate = updateProblemSchema.safeParse(req.body);
        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: `${UPDATE_PROBLEM} req body not validated`,
            });
        }

        const { problemId } = req.params;
        const problem = await problemModel.findByIdAndUpdate(
            problemId,
            req.body,
            {
                new: true,
            }
        );
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem updated successfully",
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "problem updation failed",
            err,
        });
    }
}

export async function deleteProblem(req: any, res: any) {
    try {
        const { problemId } = req.params;

        const problem = await problemModel.findByIdAndDelete(problemId);
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem deleted successfully",
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "problem deletion failed",
            err,
        });
    }
}

export async function getAllProblems(req: any, res: any) {
    try {
        const problems: Document<problemType>[] = await problemModel.find();
        return res.status(StatusCodes.SUCCESS).json({
            msg: "all problems",
            problems,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "not able to get all problems",
        });
    }
}

export async function getProblem(req: any, res: any) {
    try {
        const { problemId } = req.params;

        const problem = await problemModel.findById(problemId);
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem got",
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "not able to get problem",
            err,
        });
    }
}

// source_code
// stdin
// expected_output
// language_id
export async function solveProblem(req: any, res: any) {
    try {
        const validate = solveProblemSchema.safeParse(req.body);
        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: `${SOLVE_PROBLEM} req body not validated`,
            });
        }

        const submissionTokens = await Judge0Submit_POST(req.body);
        const submissionResponse = await Judge0Submit_GET(submissionTokens);

        if (!submissionResponse) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "not able to submit",
            });
        }

        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem submitted",
            submissionResponse,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "not able to submit",
            err,
        });
    }
}
