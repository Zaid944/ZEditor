/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import axios from "axios";
// import { Toast } from "../../../common/Toast";
import toast from "react-hot-toast";
import {
    SigninToastActionType,
    SigninToastReducer,
} from "../reducers/SigninToastReducer";
import { SignInToastMode } from "@zeditor/common";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Input } from "antd";

export const Signin: React.FC = () => {
    const [signInToastState, signInToastStateDispatch] = useReducer(
        SigninToastReducer().signinToastReducer,
        SigninToastReducer().signinToastInitialState
    );
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleEmailIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailId(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleSignIn() {
        const res = await axios.post("http://localhost:5001/user/v1/signin", {
            email: emailId,
            password,
        });
        console.log(res.data);
        //req body not validated
        //user not found
        //user signed in
        switch (res.data.toast_mode) {
            case SignInToastMode.USER_SIGNED_IN:
                signInToastStateDispatch({
                    type: SigninToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "success",
                        content: "user signed in successfully",
                    },
                });
                toast.success("signin successfull");

                //TODO: set cookie from backend
                Cookies.set("authToken", `Bearer ${res.data.token}`);
                navigate("/");
                break;
            case SignInToastMode.USER_NOT_FOUND:
                signInToastStateDispatch({
                    type: SigninToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "info",
                        content: "user not signed up",
                    },
                });
                toast.error("signin failed");
                break;
            case SignInToastMode.REQ_BODY_NOT_VALIDATED:
                signInToastStateDispatch({
                    type: SigninToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "warning",
                        content: "req body not validated",
                    },
                });
                toast.error("signin failed");
                break;
            case SignInToastMode.PASSWORD_NOT_VALIDATED:
                signInToastStateDispatch({
                    type: SigninToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "warning",
                        content: "password not correct",
                    },
                });
                toast.error("signin failed");
                break;
            case SignInToastMode.INTERNAL_SERVER_ERROR:
                signInToastStateDispatch({
                    type: SigninToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "error",
                        content: "internal server error",
                    },
                });
                toast.error("signin failed");
        }
    }

    return (
        <div>
            <div className="w-screen h-screen flex h-screen">
                <div className="m-auto h-1/2 w-1/2 pt-10">
                    <div className="text-xl text-center mt-3">SignIn</div>
                    {/* text-center -> alternate */}
                    <div className="mt-10 text-center">
                        <div className="mb-10 flex justify-between">
                            <label htmlFor="email" className="ml-36">
                                Email
                            </label>
                            <Input
                                id="email"
                                className="w-1/2 border-2 mr-22"
                                type="email"
                                onChange={handleEmailIdChange}
                            />
                        </div>
                        <div className="mb-10 flex justify-between">
                            <label htmlFor="password" className="ml-36">
                                Password
                            </label>
                            <Input
                                id="password"
                                className="w-1/2 border-2 mr-22"
                                type="password"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {/* <Toast
                            open={signInToastState.open!}
                            //@ts-ignore
                            setOpen={signInToastStateDispatch}
                            severity={signInToastState.severity!}
                            variant="filled"
                            content={signInToastState.content}
                            horizontal="center"
                            vertical="top"
                        /> */}
                    </div>
                    <div className="flex justify-center mb-10">
                        <Button
                            variant="filled"
                            color="cyan"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <div className="mr-2">Not have an account ?</div>
                        <div>
                            <Link
                                to="/signup"
                                className="underline text-blue-600"
                            >
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
