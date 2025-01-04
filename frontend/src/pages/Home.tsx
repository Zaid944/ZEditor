import { Link } from "react-router-dom";
export function Home() {
    return (
        <>
            <div className="flex mt-10 ml-7 mr-7 justify-between border-solid border-2 border-black">
                <div className="text-xl">
                    <Link to="/">Home</Link>
                </div>
                <div className="text-xl">
                    <Link to="/problems">Problems</Link>
                </div>
                <div className="text-xl">
                    <Link to="/contest">Contest</Link>
                </div>
                <div className="text-xl">
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="text-xl">
                    <Link to="/signup">Signup</Link>
                </div>
                <div className="text-xl">
                    <Link to="/signin">Signin</Link>
                </div>
            </div>
        </>
    );
}
