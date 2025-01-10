import express from "express";
import { connectDB } from "./db/db";
import userRouter from "./routes/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemRouter from "./routes/problemRouter";
import fileRouter from "./routes/fileRouter";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user/v1", userRouter);
app.use("/problemset/v1", problemRouter);
app.use("/file/v1", fileRouter);

app.listen(PORT, () => {
    try {
        console.log(`server listening on port ${PORT}`);
    } catch (err) {
        console.log("error in starting server", err);
    }
});
