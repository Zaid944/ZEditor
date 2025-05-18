import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { problemType } from "@zeditor/common";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Lozenge from "@atlaskit/lozenge";
import { Difficulty } from "@zeditor/common";

export const Problems: React.FC = () => {
    const [problems, setProblems] = useState<problemType[]>([]);
    async function getAllProblems() {
        const cookie = Cookies.get("authToken");
        try {
            const res = await axios.get(
                "http://localhost:5001/problemset/v1/allProblems",
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
    useEffect(() => {
        getAllProblems();
    }, []);
    return (
        <div className="mt-20 ml-10 mr-10 px-10 py-8">
            <Card style={{ width: 900 }}>
                <div className="flex justify-between font-bold">
                    <div>Problem Description</div>
                    <div>Topics</div>
                    <div>Difficulty</div>
                </div>
            </Card>
            {problems &&
                problems.map((problem, index) => (
                    <Card style={{ width: 900 }}>
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="mr-10">{index + 1}</div>
                                <div>
                                    <Link to={`/problems/${problem._id}`}>
                                        {problem.title}
                                    </Link>
                                </div>
                            </div>
                            <div>
                                {problem.topics.map((topic) => (
                                    <Lozenge isBold>{topic}</Lozenge>
                                ))}
                            </div>
                            <div>
                                <Lozenge
                                    appearance={
                                        Difficulty.Enum.EASY ===
                                        problem.difficulty
                                            ? "success"
                                            : Difficulty.Enum.MEDIUM ===
                                              problem.difficulty
                                            ? "moved"
                                            : "removed"
                                    }
                                >
                                    {problem.difficulty}
                                </Lozenge>
                            </div>
                        </div>
                    </Card>
                ))}
        </div>
    );
};
