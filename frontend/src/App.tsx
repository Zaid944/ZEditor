import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./homepage/Homepage";
import { Contest } from "./pages/Contest";
import { Problems } from "./pages/Problems";
import { Profile } from "./pages/Profile";
import { Signin } from "./auth/Signin/components/Signin";
import { Signup } from "./auth/Signup/components/Signup";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
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
