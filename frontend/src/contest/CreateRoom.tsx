/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { Difficulty, DifficultyType } from "@zeditor/common";

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
    const [hour, setHour] = useState(null);
    const [mins, setMins] = useState(null);
    const [secs, setSecs] = useState(null);

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
        socket.emit("join-room", { username: username, roomid: roomid });
        navigate(`/room/${roomid}`);
    };

    return (
        <div>
            <h2>Create Room</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="problemSelectId">
                    Select Number Of Problems
                </label>
                <select
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
            <div>
                <label htmlFor="difficultySelectId">Select difficulty</label>
                <select
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
            <div>
                <div>Select time</div>
                <label>Hour</label>
                <input
                    onChange={(e) => {
                        setHour(e.target.value);
                    }}
                    type="number"
                ></input>
                <label>Minutes</label>
                <input
                    onChange={(e) => {
                        setMins(e.target.value);
                    }}
                    type="number"
                ></input>
                <label>Seconds</label>
                <input
                    onChange={(e) => {
                        setSecs(e.target.value);
                    }}
                    type="number"
                ></input>
            </div>
            <button onClick={handleClick}>Create Room</button>
        </div>
    );
}
