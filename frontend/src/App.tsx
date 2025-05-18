/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CreateRoom } from "./contest/CreateRoom";
import JoinRoom from "./contest/JoinRoom";
import { ContestPlayground } from "./contest/ContestPlayground";
import { SocketContext, socket } from "./context/socket";
import { LeaderBoard } from "./contest/LeaderBoard";
import { useState, useRef, useEffect } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

function App() {
    // const [vantaEffect, setVantaEffect] = useState(0);
    // const vantaRef = useRef(null);

    // useEffect(() => {
    //     if (!vantaEffect) {
    //         setVantaEffect(
    //             NET({
    //                 el: vantaRef.current,
    //                 THREE: THREE,
    //                 mouseControls: true,
    //                 touchControls: true,
    //                 gyroControls: false,
    //                 minHeight: 600.0,
    //                 minWidth: 600.0,
    //                 scale: 1.0,
    //                 scaleMobile: 1.0,
    //             })
    //         );
    //     }
    //     return () => {
    //         if (vantaEffect) vantaEffect.destroy();
    //     };
    // }, [vantaEffect]);

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
        {
            path: "/contest/create-room",
            element: <CreateRoom />,
        },
        {
            path: "/contest/join-room",
            element: <JoinRoom />,
        },
        {
            path: "/room/:roomId",
            element: <ContestPlayground />,
        },
        {
            path: "/room/:roomId/leaderboard",
            element: <LeaderBoard />,
        },
    ];
    const [closeContest, setCloseContest] = useState(false);

    socket.on("close-contest", () => {
        setCloseContest(true);
    });

    return (
        <SocketContext.Provider value={{ socket, closeContest }}>
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
        </SocketContext.Provider>
    );
}

export default App;
