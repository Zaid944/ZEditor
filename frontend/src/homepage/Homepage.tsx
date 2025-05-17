import { useEffect } from "react";
import { Navbar } from "./navbar/components/Navbar";
import { Problems } from "./problems/components/Problems";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export function Homepage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get("authToken")) {
            navigate("/signup");
        }
    });
    return (
        <>
            <Navbar />
            <Problems />
        </>
    );
}
