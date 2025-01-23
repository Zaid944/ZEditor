import { useParams } from "react-router-dom";

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
import { problemType } from "@zeditor/common";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, List, ListItem } from "@mui/material";

const TypedEditor = Editor as React.ComponentType<EditorProps>;
type LanguageType = {
    displayName: string;
    language: string;
    value: string;
};
export const SolveProblem: React.FC = () => {
    const params = useParams();
    const { problem_id } = params;

    const languagesList: LanguageType[] = [
        {
            displayName: "cpp",
            language: "cpp",
            value: "cpp default",
        },
        {
            displayName: "java",
            language: "java",
            value: "java default",
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

    function handleClick() {
        setMenuVisible(!menuVisible);
    }

    function handleEditorChange(v: string | undefined) {
        console.log(v);
    }

    const getProblem = useCallback(async () => {
        const cookie = Cookies.get("authToken");
        try {
            const res = await axios.get(
                `http://localhost:5000/problemset/v1/problem/${problem_id}`,
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );
            console.log(res);
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
                    <div>
                        <div className="font-bold">Title: </div>
                        <div>{problem.title}</div>
                    </div>
                    <div>
                        <div className="font-bold">Description: </div>
                        <div>{problem.description}</div>
                    </div>
                    {problem.problemImage && (
                        <img src={problem.problemImage} alt="" />
                    )}
                    {problem.sample_tc.length > 0 && (
                        <div>
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
                                            {tc.image && (
                                                <ListItem>
                                                    <img
                                                        src={tc.image}
                                                        alt=""
                                                    />
                                                </ListItem>
                                            )}
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
                        </div>
                    )}
                    {problem.constraints.length > 0 && (
                        <div>
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
                        </div>
                    )}
                    {problem.topics.length > 0 && (
                        <div>
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
                        </div>
                    )}
                    <div>
                        <div className="font-bold">Difficulty: </div>
                        <div>{problem.difficulty}</div>
                    </div>
                </div>
            )}
            <div className="w-[50%]">
                <div>
                    <div className="cursor-pointer" onClick={handleClick}>
                        Language
                    </div>
                </div>
                <br />
                {menuVisible && (
                    <div className="top-[28px] right-[600px] absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
                        {languagesList.map((language, index) => (
                            <div
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
                )}
                <TypedEditor
                    height="50%"
                    width="100%"
                    className="border-2 border-black"
                    defaultLanguage={languagesList[0].language}
                    defaultValue={languagesList[0].value}
                    value={languagesList[languagesListIdx].value}
                    language={languagesList[languagesListIdx].language}
                    onChange={handleEditorChange}
                />
                <br />
                <div>
                    <div className="flex justify-between">
                        <div className="w-[20%]">Input</div>
                        <textarea className="w-[80%] border-2 border-black" />
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <div className="w-[20%]">Output</div>
                        <textarea className="w-[80%] border-2 border-black" />
                    </div>
                </div>
                <br />
                <div className="w-[20%] flex justify-between">
                    <Button color="success">Submit</Button>
                    <Button color="primary">Run</Button>
                </div>
            </div>
        </div>
    );
};
