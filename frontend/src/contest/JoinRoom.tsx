import { useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
});

export default function JoinRoom() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [roomid, setRoomid] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRoomidChange = (e) => {
        setRoomid(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem("username", username);
        socket.emit("join-room", { username: username, roomid: roomid });
        navigate(`/room/${roomid}`);
    };

    return (
        <div className="w-screen h-screen flex h-screen">
            <div className="h-[90%] mt-40 w-1/2 mx-auto pt-10">
                <h2>Join Room</h2>
                <br />
                <div>
                    <label htmlFor="username">Username</label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Room ID</label>
                    <Input
                        type="text"
                        id="roomid"
                        value={roomid}
                        onChange={handleRoomidChange}
                    />
                </div>
                <br />
                <Button color="geekblue" variant="solid" onClick={handleClick}>
                    Enter Contest
                </Button>
                {/* <button>Hi</button> */}
            </div>
        </div>
    );
}
