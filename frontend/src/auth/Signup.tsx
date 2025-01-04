import { Link } from "react-router-dom";
import { Input } from "../common/Input";

export function Signup() {
    return (
        <>
            <div className="flex h-screen">
                <div className="border-solid border-2 border-black m-auto h-1/2 w-1/3">
                    <div className="flex justify-center mt-5">SignIn</div>
                    <div className="mt-20">
                        <Input label={"email"} />
                        <Input label={"password"} />
                    </div>
                    <div className="flex justify-center align-center pt-4">
                        <button className="text-white bg-black w-24 h-10 rounded-md">
                            SignUp
                        </button>
                    </div>
                    <div className="flex justify-center align-center mt-2">
                        not a member :
                        <div className="border-b-2 border-black ml-2">
                            <Link to="/signup">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
