/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { SocketContext } from "../context/socket";
import {
    problemType,
    solveProblemHelperType,
    solveProblemType,
} from "@zeditor/common";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Card } from "antd";
import toast from "react-hot-toast";
import { Base64 } from "js-base64";
import { Editor, EditorProps } from "@monaco-editor/react";
import { LanguageType } from "../problems/solve_problem/components/SolveProblem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TypedEditor = Editor as React.ComponentType<EditorProps>;

type Props = {
    roomId: string;
    username: string;
    setCount: any;
    count: number;
    initialTime: number;
};

export const Playground = ({
    roomId,
    setCount,
    username,
    count,
    initialTime,
}: Props) => {
    console.log("zaid initial time: ", initialTime);
    const [time, setTime] = useState(initialTime);
    const navigate = useNavigate();
    const languagesList: LanguageType[] = [
        {
            displayName: "cpp",
            language: "cpp",
            value: "cpp default",
            language_id: 105,
        },
        {
            displayName: "java",
            language: "java",
            value: "java default",
            language_id: 91,
        },
    ];

    const [problem] = useState<problemType | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [languagesListIdx, setLanguagesListIdx] = useState(0);
    const [editorValue, setEditorValue] = useState(
        languagesList[languagesListIdx].value
    );
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const { socket } = useContext(SocketContext);

    // console.log("inputValue", inputValue);
    // console.log("editorValue", editorValue);

    function handleClick() {
        setMenuVisible(!menuVisible);
    }

    function handleEditorChange(v: string | undefined) {
        setEditorValue(v);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputValue(e.target.value);
    }

    function handleOutputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setOutputValue(e.target.value);
    }

    async function Recurse(tokens) {
        try {
            const cookie = Cookies.get("authToken");
            const response = await axios.post(
                "http://localhost:5001/problemset/v1/solveProblemGetToken",
                { tokens: tokens },
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );

            console.log("solve problem response is: ", response);
            if (
                response.data.submissionResponse.submissions[0].status.id === 3
            ) {
                toast.success("problem submitted");
                setOutputValue(
                    Base64.decode(
                        response.data.submissionResponse.submissions[0].stdout
                    )
                );
                return;
            } else if (
                response.data.submissionResponse.submissions[0].status.id ===
                    1 ||
                response.data.submissionResponse.submissions[0].status.id === 2
            ) {
                console.log("reached here");
                toast.error("problem not submitted");
                await Recurse(tokens);
            }
            return;
        } catch (err) {
            toast.error("problem not submitted");
            console.log("solve problem error", err);
        }
    }

    async function handleProblemRun() {
        setCount(count + 1);
        socket.emit("update-score", {
            username: username,
            count: count + 1,
            roomid: roomId,
        });
        /**{
    "submissions": [{
        "source_code": "I2luY2x1ZGUgPGlvc3RyZWFtPgp1c2luZyBuYW1lc3BhY2Ugc3RkOwppbnQgbWFpbigpIHsKICAgIGNvdXQ8PCJIZWxsbyBXb3JsZCEiOwp9Cg==",
        "language_id": 105,
        "input": ""
    }]
} */
        const solveProblemReqBody: solveProblemType = {
            submissions: [
                {
                    stdin: Base64.encode(inputValue),
                    source_code: Base64.encode(editorValue),
                    language_id: languagesList[languagesListIdx].language_id,
                },
            ],
        };

        console.log("solveProblemReqBody", solveProblemReqBody);

        try {
            const cookie = Cookies.get("authToken");
            const response = await axios.post(
                "http://localhost:5001/problemset/v1/solveProblem",
                solveProblemReqBody,
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );

            console.log("solve problem response is: ", response);
            const tokens = [];
            for (
                let i = 0;
                i < response.data.submissionResponse.submissions.length;
                i++
            ) {
                tokens.push(
                    response.data.submissionResponse.submissions[i].token
                );
            }
            if (
                response.data.submissionResponse.submissions[0].status.id === 3
            ) {
                toast.success("problem submitted");
                setOutputValue(
                    Base64.decode(
                        response.data.submissionResponse.submissions[0].stdout
                    )
                );
            } else if (
                response.data.submissionResponse.submissions[0].status.id ===
                    1 ||
                response.data.submissionResponse.submissions[0].status.id === 2
            ) {
                console.log("recursive reached");
                console.log("reached here");
                toast.error("problem not submitted");
                await Recurse(tokens);
            }
            return;
        } catch (err) {
            toast.error("problem not submitted");
            console.log("solve problem error", err);
        }
    }

    async function handleProblemSubmit() {
        /**
         * url: z.string(),
    source_code: z.string(),
    language_id: z.number(),
         */
        const submitProblemReqBody: solveProblemHelperType = {
            url: problem.final_tc,
            source_code: Base64.encode(editorValue),
            language_id: languagesList[languagesListIdx].language_id,
        };

        console.log("submitProblemReqBody", submitProblemReqBody);

        try {
            const cookie = Cookies.get("authToken");
            const response = await axios.post(
                "http://localhost:5001/problemset/v1/solveProblem?file=true",
                submitProblemReqBody,
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );

            console.log("submit problem response is: ", response);
        } catch (err) {
            toast.error("not able to submit problem");
            console.log(err);
        }
    }

    function handleContestEnd() {
        socket.emit("close-contest", { roomid: roomId });
        navigate(`/room/${roomId}/leaderboard`);
    }

    // if (time == 0) {

    // }

    useEffect(() => {
        if (initialTime == 0) return;
        socket.emit("store-time", { time: time, roomid: roomId });
        const timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    navigate(`/room/${roomId}/leaderboard`);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [initialTime, navigate, roomId, socket, time]);

    return (
        <>
            <TypedEditor
                height="50vh"
                width="100vw"
                className="border-2 border-black"
                defaultLanguage={languagesList[0].language}
                defaultValue={languagesList[0].value}
                value={languagesList[languagesListIdx].value}
                language={languagesList[languagesListIdx].language}
                onChange={handleEditorChange}
                theme="vs-dark"
            />
            <br />
            <Card>
                <div className="flex justify-between">
                    <div className="w-[20%] ml-10">Input</div>
                    <textarea
                        onChange={handleInputChange}
                        className="w-[80%] border-2 rounded-lg border-black"
                    />
                </div>
                <br />
                <div className="flex justify-between">
                    <div className="w-[20%] ml-10">Output</div>
                    <textarea
                        onChange={handleOutputChange}
                        value={outputValue}
                        className="w-[80%] rounded-lg border-2 border-black"
                    />
                </div>
            </Card>
            <br />
            <div className="ml-10 w-[30%] flex justify-between">
                <Button
                    variant="solid"
                    color="green"
                    onClick={handleProblemSubmit}
                >
                    Submit
                </Button>
                <Button
                    variant="solid"
                    color="orange"
                    onClick={handleProblemRun}
                >
                    Run
                </Button>
                <Button variant="solid" color="red" onClick={handleContestEnd}>
                    EndContest
                </Button>
            </div>
            <br />
            {time && (
                <div className="ml-10">
                    <p>
                        Time left:{" "}
                        {`${Math.floor(time / (60 * 60))}`.padStart(2, "0")}:
                        {`${Math.floor((time % (60 * 60)) / 60)}`.padStart(
                            2,
                            "0"
                        )}
                        :{`${time % 60}`.padStart(2, "0")}
                    </p>
                </div>
            )}
        </>
    );
};

// hr * (60 * 60) + min * (60) + sec
