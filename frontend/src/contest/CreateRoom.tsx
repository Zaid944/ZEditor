/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { Difficulty, DifficultyType } from "@zeditor/common";
import { Button, Input } from "antd";

// console.log(import.meta.env.VITE_BACKEND_URL);

const randomUuid = v4();

export function CreateRoom() {
    const { socket } = useContext(SocketContext);

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [numberOfProblems, setNumberOfProblems] = useState("1");
    const [difficuly, setDifficulty] = useState<DifficultyType>(
        Difficulty.Enum.EASY
    );
    const [roomid] = useState(randomUuid);
    const [hour, setHour] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("problem is: ", numberOfProblems);
        console.log("difficulty", difficuly);
        console.log("hour is", hour);
        localStorage.setItem("problemCount", numberOfProblems);
        localStorage.setItem("difficulty", difficuly);
        localStorage.setItem("hour", hour);
        localStorage.setItem("mins", mins);
        localStorage.setItem("secs", secs);
        localStorage.setItem("username", username);
        socket.emit("contest-info", {
            roomid: roomid,
            problemCount: numberOfProblems,
            difficuly: difficuly,
            hour: hour,
            mins: mins,
            secs: secs,
        });
        socket.emit("join-room", { username: username, roomid: roomid });
        navigate(`/room/${roomid}`);
    };

    return (
        <div className="w-screen h-screen flex h-screen">
            <div className="h-[90%] mt-10 w-1/2 mx-auto pt-10">
                <h2 className="text-center">Create Room</h2>
                <br />
                <br />
                <div className="flex justify-between">
                    <label className="ml-40" htmlFor="username">
                        Username
                    </label>
                    <Input
                        className="w-1/2"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="problemSelectId" className="ml-40">
                        Select Number Of Problems
                    </label>
                    <select
                        className="ml-6"
                        onChange={(e) => {
                            // console.log("debug", e.target.value);
                            setNumberOfProblems(e.target.value);
                        }}
                        id="problemSelectId"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
                <br />
                <div>
                    <label htmlFor="difficultySelectId" className="ml-40">
                        Select difficulty
                    </label>
                    <select
                        className="ml-28"
                        onChange={(e) => {
                            // console.log(this);
                            setDifficulty(e.target.value as DifficultyType);
                        }}
                        id="difficultySelectId"
                    >
                        <option value={Difficulty.Enum.EASY}>Easy</option>
                        <option value={Difficulty.Enum.MEDIUM}>Medium</option>
                        <option value={Difficulty.Enum.HARD}>Hard</option>
                    </select>
                </div>
                <br />
                <div>
                    <div className="ml-40">Select time</div>
                    <br />
                    <div className="flex justify-between">
                        <label className="ml-40">Hour</label>
                        <Input
                            defaultValue={0}
                            className="w-1/2"
                            onChange={(e) => {
                                setHour(e.target.value);
                            }}
                            type="number"
                        ></Input>
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <label className="ml-40">Minutes</label>
                        <Input
                            defaultValue={0}
                            className="w-1/2"
                            onChange={(e) => {
                                setMins(e.target.value);
                            }}
                            type="number"
                        ></Input>
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <label className="ml-40">Seconds</label>
                        <Input
                            defaultValue={0}
                            className="w-1/2"
                            onChange={(e) => {
                                setSecs(e.target.value);
                            }}
                            type="number"
                        ></Input>
                    </div>
                </div>
                <br />
                <br />
                <Button
                    variant="solid"
                    color="volcano"
                    className="ml-[340px]"
                    onClick={handleClick}
                >
                    Create
                </Button>
            </div>
        </div>
    );
}
