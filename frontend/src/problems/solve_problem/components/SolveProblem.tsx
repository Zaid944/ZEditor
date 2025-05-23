/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Difficulty } from "@zeditor/common";
import Lozenge from "@atlaskit/lozenge";

/**
 * {
  "_id": {
    "$oid": "678b99b54a3eeffec680fbb0"
  },
  "title": "count apples",
  "description": "count the number of 1s in array",
  "problemImage": "",
  "sample_tc": [],
  "final_tc": "",
  "constraints": [],
  "topics": [],
  "difficulty": "EASY",
  "__v": 0
}
 */
import { Editor, EditorProps } from "@monaco-editor/react";
import { TextArea } from "antd-mobile";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Menu, GetProp, MenuProps, Input } from "antd";
import {
    problemType,
    solveProblemHelperType,
    solveProblemType,
} from "@zeditor/common";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { List, ListItem } from "@mui/material";
import { Button } from "antd";
import toast from "react-hot-toast";
import { Base64 } from "js-base64";
import { Card } from "antd";

const TypedEditor = Editor as React.ComponentType<EditorProps>;
export type LanguageType = {
    displayName: string;
    language: string;
    value: string;
    language_id: number;
};

type MenuItem = GetProp<MenuProps, "items">[number];

export const SolveProblem: React.FC = () => {
    const params = useParams();
    const { problem_id } = params;

    const items: MenuItem[] = [
        {
            onClick: handleClick,
            key: "",
            label: "Language",
            children: [
                {
                    key: "0",
                    label: "CPP",
                    onClick: () => {
                        setLanguagesListIdx(0);
                        setEditorValue(languagesList[0].value);
                    },
                },
                {
                    key: "1",
                    label: "JAVA",
                    onClick: () => {
                        setLanguagesListIdx(1);
                        setEditorValue(languagesList[1].value);
                    },
                },
            ],
        },
    ];

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

    const [problem, setProblem] = useState<problemType | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [languagesListIdx, setLanguagesListIdx] = useState(0);
    const [editorValue, setEditorValue] = useState(
        languagesList[languagesListIdx].value
    );
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState("");

    console.log("inputValue", inputValue);
    console.log("editorValue", editorValue);

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

    async function handleProblemRun() {
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
            if (
                response.data.submissionResponse.submissions[0].status.id === 3
            ) {
                toast.success("problem submitted");
                setOutputValue(
                    Base64.decode(
                        response.data.submissionResponse.submissions[0].stdout
                    )
                );
            } else {
                console.log("reached here");
                toast.error("problem not submitted");
            }
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

    const getProblem = useCallback(async () => {
        const cookie = Cookies.get("authToken");
        try {
            const res = await axios.get(
                `http://localhost:5001/problemset/v1/problem/${problem_id}`,
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );
            console.log("problem is: ", res);
            setProblem(res.data.problem);
        } catch (err) {
            console.log("frontend setProblem error", err);
        }
    }, [problem_id]);

    useEffect(() => {
        getProblem();
    }, [getProblem]);

    return (
        <div className="flex w-screen h-screen">
            {problem && (
                <div className="w-[50%]">
                    <Card>
                        <div className="flex">
                            <div className="font-bold">Title: </div>
                            <div className="ml-3">{problem.title}</div>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <div className="font-bold">Description: </div>
                            <div>{problem.description}</div>
                        </div>
                    </Card>
                    {problem.problemImage && (
                        <Card>
                            <div className="font-bold">
                                <div>problem image: </div>
                                <br></br>
                                <img
                                    className="w-1/2 h-48 rounded-lg"
                                    src={problem.problemImage}
                                    alt=""
                                />
                            </div>
                        </Card>
                    )}
                    {problem.sample_tc.length > 0 && (
                        <Card>
                            <div>
                                <div className="font-bold">
                                    Sample Test Cases:{" "}
                                </div>
                            </div>
                            <div>
                                {problem.sample_tc.map((tc, index) => {
                                    return (
                                        <List key={index}>
                                            <ListItem>
                                                Sample Test Case #{index + 1}
                                            </ListItem>
                                            <ListItem>
                                                {tc.explanation}
                                            </ListItem>
                                            {/* {tc.image && (
                                                <ListItem>
                                                    <img
                                                        src={tc.image}
                                                        alt=""
                                                    />
                                                </ListItem>
                                            )} */}
                                            <ListItem>
                                                Input
                                                <br />
                                                {tc.input}
                                            </ListItem>
                                            <ListItem>
                                                Output
                                                <br />
                                                {tc.output}
                                            </ListItem>
                                        </List>
                                    );
                                })}
                            </div>
                        </Card>
                    )}
                    {problem.constraints.length > 0 && (
                        <Card>
                            <div className="font-bold">Constraints: </div>
                            <div>
                                <List>
                                    {problem.constraints.map(
                                        (constraint, index) => {
                                            return (
                                                <ListItem>
                                                    <div>
                                                        Constraint #{index + 1}
                                                    </div>
                                                    <div>{constraint}</div>
                                                </ListItem>
                                            );
                                        }
                                    )}
                                </List>
                            </div>
                        </Card>
                    )}
                    {problem.topics.length > 0 && (
                        <Card>
                            <div className="font-bold">Topics: </div>
                            <div>
                                <List>
                                    {problem.topics.map((topic, index) => {
                                        return (
                                            <ListItem>
                                                <div>Topic #{index + 1}</div>
                                                <div>{topic}</div>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>
                        </Card>
                    )}
                    <Card>
                        <div className="font-bold">Difficulty: </div>
                        <Lozenge
                            appearance={
                                Difficulty.Enum.EASY === problem.difficulty
                                    ? "success"
                                    : Difficulty.Enum.MEDIUM ===
                                      problem.difficulty
                                    ? "moved"
                                    : "removed"
                            }
                        >
                            {problem.difficulty}
                        </Lozenge>
                    </Card>
                </div>
            )}
            <div className="w-[50%]">
                <div>
                    {/* <div className="cursor-pointer" onClick={handleClick}>
                        Language
                    </div> */}
                    <Menu theme="light" mode="horizontal" items={items} />
                </div>
                <br />
                {/* {menuVisible && (
                    <div className="top-[28px] right-[600px] absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
                        {languagesList.map((language, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    console.log(index);
                                    setLanguagesListIdx(index);
                                    setEditorValue(languagesList[index].value);
                                    setMenuVisible(false);
                                }}
                                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                            >
                                {language.displayName}
                            </div>
                        ))}
                    </div>
                )} */}
                <TypedEditor
                    height="50%"
                    width="100%"
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
                        <div className="w-[20%]">Input</div>
                        <textarea
                            onChange={handleInputChange}
                            className="w-[80%] border-2 border-black rounded-lg"
                        />
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <div className="w-[20%]">Output</div>
                        <textarea
                            onChange={handleOutputChange}
                            value={outputValue}
                            className="w-[80%] border-2 border-black rounded-lg"
                        />
                    </div>
                </Card>
                <br />
                <div className="w-[20%] flex justify-between">
                    <Button
                        variant="solid"
                        color="green"
                        onClick={handleProblemSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="solid"
                        color="yellow"
                        onClick={handleProblemRun}
                    >
                        Run
                    </Button>
                </div>
            </div>
        </div>
    );
};
