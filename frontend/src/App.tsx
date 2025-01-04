import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contest } from "./pages/Contest";
import { Problems } from "./pages/Problems";
import { Profile } from "./pages/Profile";
import { Signin } from "./auth/Signin";
import { Signup } from "./auth/Signup";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contest" element={<Contest />} />
                    <Route path="/problems" element={<Problems />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
