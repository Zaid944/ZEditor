//improve using antd
import Lozenge from "@atlaskit/lozenge";
import { Difficulty, problemType } from "@zeditor/common";
import { Card, List } from "antd";

type QuestionProps = {
    problem: problemType;
};
export const Question = ({ problem }: QuestionProps) => {
    return (
        <>
            <div>
                <Card>
                    <div className="font-bold">Title: </div>
                    <div>{problem.title}</div>
                </Card>
                <Card>
                    <div className="font-bold">Description: </div>
                    <div>{problem.description}</div>
                </Card>
                {problem.problemImage && (
                    <Card>
                        <div className="font-bold">Problem Image: </div>
                        <br />
                        <img
                            className="w-1/2 h-48 rounded-lg"
                            src={problem.problemImage}
                            alt=""
                        />
                    </Card>
                )}
                {problem.sample_tc.length > 0 && (
                    <Card>
                        <div>
                            <div className="font-bold">Sample Test Cases: </div>
                        </div>
                        <div>
                            {problem.sample_tc.map((tc, index) => {
                                return (
                                    <List key={index}>
                                        <List.Item>
                                            Sample Test Case #{index + 1}
                                        </List.Item>
                                        <List.Item>{tc.explanation}</List.Item>
                                        {/* {tc.image && (
                                            <List.Item>
                                                <img src={tc.image} alt="" />
                                            </List.Item>
                                        )} */}
                                        <List.Item>
                                            Input
                                            <br />
                                            {tc.input}
                                        </List.Item>
                                        <List.Item>
                                            Output
                                            <br />
                                            {tc.output}
                                        </List.Item>
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
                                            <List.Item>
                                                <div>
                                                    Constraint #{index + 1}
                                                </div>
                                                <div>{constraint}</div>
                                            </List.Item>
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
                                        <List.Item>
                                            <div>Topic #{index + 1}</div>
                                            <div>{topic}</div>
                                        </List.Item>
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
                                : Difficulty.Enum.MEDIUM === problem.difficulty
                                ? "moved"
                                : "removed"
                        }
                    >
                        {problem.difficulty}
                    </Lozenge>
                </Card>
            </div>
        </>
    );
};
