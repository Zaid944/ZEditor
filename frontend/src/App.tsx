import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./homepage/Homepage";
import { Contest } from "./pages/Contest";
// import { Problems } from "./pages/Problems";
import { Profile } from "./pages/Profile";
import { Signin } from "./auth/Signin/components/Signin";
import { Signup } from "./auth/Signup/components/Signup";
import { CreateProblems } from "./problems/crud_problem/components/CreateProblems";
import { SolveProblem } from "./problems/solve_problem/components/SolveProblem";
import { Toaster } from "react-hot-toast";

function App() {
    const routes = [
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/contest",
            element: <Contest />,
        },
        {
            path: "/problems",
            element: <CreateProblems />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/signin",
            element: <Signin />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/problems/:problem_id",
            element: <SolveProblem />,
        },
    ];
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, key) => (
                        <Route
                            key={key}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
            {/* for showing toast at global level */}
            <Toaster />
        </>
    );
}

export default App;
