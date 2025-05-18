import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { useState } from "react";

const LEADERBOARD = "[leaderboard]";

export const LeaderBoard = () => {
    const { socket } = useContext(SocketContext);
    const [leaderboard, setLeaderboard] = useState({});
    const { roomId } = useParams();

    console.log(LEADERBOARD + " roomid", roomId);
    useEffect(() => {
        const getContestScore = (data) => {
            console.log(LEADERBOARD + "contest scores : ", data);
            setLeaderboard(data.contest_score);
        };

        socket.emit("get-contest-score", { roomid: roomId });

        socket.on("contest-score", getContestScore);

        return () => {
            socket.off("contest-score", getContestScore);
        };
    }, [roomId, socket]);

    return (
        <div>
            {Object.keys(leaderboard).map((user) => (
                <div>
                    {user} : {leaderboard[user]}
                </div>
            ))}
        </div>
    );
};
