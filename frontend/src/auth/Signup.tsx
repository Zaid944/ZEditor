import { TextField, Button } from "@mui/material/";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export const Signup: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const fields = [
        {
            label: "Name",
            type: "text",
            setLabel: setName,
        },
        {
            label: "Email",
            type: "email",
            setLabel: setEmail,
        },
        {
            label: "Password",
            type: "password",
            setLabel: setPassword,
        },
        {
            label: "Confirm Password",
            type: "password",
            setLabel: setConfirmPassword,
        },
    ];

    return (
        <>
            <div className="w-screen h-screen flex h-screen">
                <div className="h-full w-1/2 border border-2 mx-auto pt-20">
                    <div className="text-xl text-center mt-3">SignUp</div>
                    {/* text-center -> alternate */}
                    <div className="mt-10 text-center">
                        {fields.map((field, index) => (
                            <div key={index} className="mb-10">
                                <TextField
                                    onChange={(e) => {
                                        field.setLabel(e.target.value);
                                    }}
                                    className="w-1/2"
                                    label={field.label}
                                    type={field.type}
                                ></TextField>
                            </div>
                        ))}
                        <div className="mb-10 flex w-full justify-around">
                            <div>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                >
                                    Select Profile Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files != null) {
                                                setProfileImage(
                                                    //@ts-ignore
                                                    e.target.files[0]
                                                );
                                            }
                                        }}
                                    />
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    startIcon={<CloudUpload />}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                        <Button variant="contained">Sign Up</Button>
                    </div>
                    <div className="flex justify-center">
                        <div className="mr-2">Already have an account ?</div>
                        <div>
                            <Link to="/signin" className="underline">
                                Signin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
