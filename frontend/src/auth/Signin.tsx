import { TextField, Button } from "@mui/material/";
import { Link } from "react-router-dom";

export const Signin: React.FC = () => {
    return (
        <>
            <div className="w-screen h-screen flex h-screen">
                <div className="m-auto h-1/2 w-1/2 border border-2">
                    <div className="text-xl text-center mt-3">SignIn</div>
                    {/* text-center -> alternate */}
                    <div className="mt-10 text-center">
                        <div className="mb-10">
                            <TextField
                                className="w-1/2"
                                label="Email"
                                type="email"
                            />
                        </div>
                        <div className="mb-10">
                            <TextField
                                className="w-1/2"
                                label="Password"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                        <Button variant="contained">Sign In</Button>
                    </div>
                    <div className="flex justify-center">
                        <div className="mr-2">Not have an account ?</div>
                        <div>
                            <Link to="/signup" className="underline">
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
