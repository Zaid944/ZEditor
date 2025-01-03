import express from "express";
import {
    Signup,
    Signin,
    UploadImage,
    GetUser,
    DeleteUser,
    UpdateUser,
} from "../controller/userController";
import { IsAuthenticated } from "../middleware/IsAuthenticated";
import UploadFile from "../middleware/UploadFile";

const userRouter = express.Router();

userRouter.route("/signin").post(Signin);
userRouter.route("/signup").post(Signup);

userRouter.route("/uploadImage").post(UploadFile, UploadImage);
userRouter.use(IsAuthenticated);
userRouter.route("/getUser").get(GetUser);
userRouter.route("/updateUser").put(UpdateUser);
userRouter.route("/deleteUser").delete(DeleteUser);

export default userRouter;
