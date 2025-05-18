import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { useState } from "react";
import { Card } from "antd";

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
        <div className="w-screen h-screen">
            <div className="h-1/2 flex items-center justify-center">
                <Card style={{ width: "300px" }}>
                    <div className="ml-20">Leaderboard</div>
                    <br />
                    {Object.keys(leaderboard)
                        .sort((a, b) => leaderboard[b] - leaderboard[a])
                        .map((user, index) => (
                            <div className="flex">
                                <div>{index})</div>
                                <div className="ml-4">
                                    {user} : {leaderboard[user]}
                                </div>
                            </div>
                        ))}
                </Card>
            </div>
        </div>
    );
};
