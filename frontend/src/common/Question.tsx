//improve using antd
import { problemType } from "@zeditor/common";
import { List } from "antd";

type QuestionProps = {
    problem: problemType;
};
export const Question = ({ problem }: QuestionProps) => {
    return (
        <>
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
                                        {tc.image && (
                                            <List.Item>
                                                <img src={tc.image} alt="" />
                                            </List.Item>
                                        )}
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
                    </div>
                )}
                {problem.topics.length > 0 && (
                    <div>
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
                    </div>
                )}
                <div>
                    <div className="font-bold">Difficulty: </div>
                    <div>{problem.difficulty}</div>
                </div>
            </div>
        </>
    );
};
