/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState, useContext, act } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { Tabs } from "antd";
import { Splitter } from "antd";
import axios from "axios";
import { problemType } from "@zeditor/common";
import { Question } from "../common/Question";
import Cookies from "js-cookie";
import { Playground } from "../common/Playground";
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//     transports: ["websocket"],
// });

// type userToQuestionType = {
//     key :
// }

export function ContestPlayground() {
    const [size, setSize] = useState<"small" | "middle" | "large">("small");
    const { roomId } = useParams();
    const { socket, closeContest } = useContext(SocketContext);
    // console.log("params", useParams());

    const [numberOfProblems, setNumberOfProblems] = useState("");
    const [difficuly, setDifficulty] = useState("");
    const [hour, setHour] = useState(null);
    const [mins, setMins] = useState(null);
    const [secs, setSecs] = useState(null);
    const [problems, setProblems] = useState<problemType[]>([]);
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState<string[]>([]);
    const [activeKey, setActiveKey] = useState("1");
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [getTime, setGetTime] = useState<number>(Infinity);
    console.log("count issss: ", count);
    // const [userToQuestion, setUserToQuestion] = useState<>({});

    // console.log("activeKey is: ", activeKey);
    // console.log("users is: ", users);
    console.log("zaiddddd username is: ", username);
    console.log("activeKey", activeKey);
    async function getProblems() {
        const cookie = Cookies.get("authToken");
        console.log(
            `http://localhost:5001/problemset/v1/allProblems?count=${localStorage.getItem(
                "problemCount"
            )}&difficulty=${localStorage.getItem("difficulty")}`
        );
        try {
            const res = await axios.get(
                `http://localhost:5001/problemset/v1/allProblems?count=${localStorage.getItem(
                    "problemCount"
                )}&difficulty=${localStorage.getItem("difficulty")}`,
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );
            console.log(res.data);
            setProblems(res.data.problems);
        } catch (err) {
            console.log(err);
        }
    }

    // console.log("render component");

    console.log("socket id: ", socket.id);
    // console.log("close Contest", closeContest);
    // if (closeContest) {
    //     navigate(`/room/${roomId}/leaderboard`);
    // }

    // const navigateToLeaderboard = () => {
    //     console.log("reached inside close contest");
    //     navigate(`/room/${roomId}/leaderboard`);
    // };

    // socket.on("get-close-contest", navigateToLeaderboard);

    useEffect(() => {
        setHour(Number.parseInt(localStorage.getItem("hour")));
        setMins(Number.parseInt(localStorage.getItem("mins")));
        setSecs(Number.parseInt(localStorage.getItem("secs")));
        getProblems();
        // socket.emit("store-time", {
        //     time: hour * 3600 + mins * 60 + secs,
        //     roomid: roomId,
        // });
        // const username = localStorage.getItem("username");
        // setUsername(username);
        // console.log("reached here");

        const handleAllUsers = (data) => {
            // console.log("Got all users:", data.users);
            setUsers(data.users); // if using state
            setUsername(data.users[activeKey - "1"]);
        };

        const navigateToLeaderboard = (data) => {
            console.log("zaid debug valuueeeeee !!!!!!!!!");
            if (data.value == true) {
                console.log("reached inside close contest");
                navigate(`/room/${roomId}/leaderboard`);
            }
        };

        // console.log("socket id on client side is", socket.id);
        socket.emit("get-users-in-room", { roomid: roomId });

        socket.on("allusers", handleAllUsers);

        // const intervalId = setInterval(() => {
        //     console.log("intervalllllsssss");
        //     socket.emit("get-close-contest", { roomid: roomId });

        //     socket.on("close-contest-value", navigateToLeaderboard);

        //     return () => {
        //         socket.off("close-contest-value", navigateToLeaderboard);
        //     };
        // }, 1000);

        // socket.on("close-contest", navigateToLeaderboard);

        // console.log(socketRef, roomId, username);

        // console.log(socketRef);
        const getTimeFunc = (data) => {
            console.log("time function yayyyyy");
            console.log(data.time);
            setGetTime(data.time);
        };

        socket.emit("get-store-time", { roomid: roomId });

        socket.on("time", getTimeFunc);
        return () => {
            socket.off("allusers", handleAllUsers);
            // socket.off("time", getTimeFunc);
            // clearInterval(intervalId);
            // socket.off("close-contest", navigateToLeaderboard);
            //handle socket disconnection
        };
    }, [activeKey, hour, mins, navigate, roomId, secs, socket]);

    console.log("zaid getTime", getTime);

    // console.log("users length", users.length.toString());

    return (
        <div>
            <Splitter className="h-screen">
                <Splitter.Panel defaultSize="40%" min="20%" max="70%">
                    <Tabs
                        onChange={(key) => {}}
                        defaultActiveKey="1"
                        type="card"
                        size={size}
                        style={{ marginBottom: 32 }}
                        items={problems.map((problem, i) => {
                            const id = String(i + 1);
                            return {
                                label: `Question ${id}`,
                                key: id,
                                children: <Question problem={problem} />,
                            };
                        })}
                    />
                </Splitter.Panel>
                <Splitter.Panel>
                    <Tabs
                        onChange={(key) => {
                            setActiveKey(key);
                            setUsername(users[key - "1"]);
                        }}
                        type="card"
                        size={size}
                        style={{ marginBottom: 32 }}
                        items={users.map((user, i) => {
                            const id = String(i + 1);
                            return {
                                label: user,
                                key: id,
                                children: (
                                    <Playground
                                        initialTime={
                                            hour * 3600 + mins * 60 + secs
                                        }
                                        roomId={roomId}
                                        username={username}
                                        setCount={setCount}
                                        count={count}
                                    />
                                ),
                            };
                        })}
                    />
                </Splitter.Panel>
            </Splitter>
        </div>
    );
}

/**
 * default active key not working
 *
 */
