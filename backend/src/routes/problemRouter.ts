import express from "express";
import {
    createProblem,
    updateProblem,
    deleteProblem,
    getAllProblems,
    getProblem,
    solveProblem,
    solveProblemGetTokenValue,
} from "../controller/problemController";
import { IsAuthenticated } from "../middleware/IsAuthenticated";
import { SolveProblemHelper } from "../middleware/SolveProblemHelper";

const problemRouter = express.Router();

problemRouter.use(IsAuthenticated);
problemRouter.route("/createProblem").post(createProblem);
problemRouter.route("/updateProblem/:problemId").post(updateProblem);
problemRouter.route("/deleteProblem/:problemId").delete(deleteProblem);
problemRouter.route("/allProblems").get(getAllProblems);
problemRouter.route("/problem/:problemId").get(getProblem);

problemRouter.use((req, res, next) => {
    console.log("req.query zaid is: ", req.query);
    if (req.query.file) {
        console.log("reached in the middleware");
        SolveProblemHelper(req, res, next);
    } else {
        next();
    }
});
problemRouter.route("/solveProblem").post(solveProblem);
problemRouter.route("/solveProblemGetToken").post(solveProblemGetTokenValue);

export default problemRouter;
