import { Button } from "@mui/material";
import { Topic } from "./fields/Topic";
import { Fields } from "./common/Fields";
import { SampleTestCase } from "./fields/SampleTestCase";
import { AccordionCustom } from "./common/AccordionCustom";
import { Constraint } from "./fields/Constraint";
import { useReducer, useState } from "react";
import {
    createProblemActionType,
    createProblemInitialState,
    createProblemReducer,
} from "../reducers/createProblemReducer";
import {
    createProblemFileActionType,
    createProblemFileInitialState,
    createProblemFileReducer,
} from "../reducers/createProblemFileReducer";
import { useFile } from "../../../common/hooks/useFile";

export const CreateProblems: React.FC = () => {
    const [uploadFile] = useFile();

    const [createProblemState, createProblemDispatch] = useReducer(
        createProblemReducer,
        createProblemInitialState
    );

    const [createProblemFileState, createProblemFileDispatch] = useReducer(
        createProblemFileReducer,
        createProblemFileInitialState
    );

    const [uploadProblemImageLoading, setUploadProblemImageLoading] =
        useState(false);

    const [rateLimit, setRateLimit] = useState(true);

    //make it common both
    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        createProblemDispatch({
            type: createProblemActionType.SET_TITLE,
            payload: {
                ...createProblemState,
                title: e.target.value,
            },
        });
    }

    function handleDescriptionChange(
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        createProblemDispatch({
            type: createProblemActionType.SET_DESCRIPTION,
            payload: {
                ...createProblemState,
                description: e.target.value,
            },
        });
    }

    function handleProblemImageClick(e: React.MouseEvent<HTMLInputElement>) {
        (e.target as HTMLInputElement).value = "";
    }

    function handleProblemImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        setRateLimit(true);
        createProblemFileDispatch({
            type: createProblemFileActionType.SET_PROBLEM_IMAGE,
            payload: {
                problemImage: e.target.files[0],
            },
        });
    }

    async function handleProblemImageUpload() {
        if (!(createProblemFileState.problemImage && rateLimit)) {
            return;
        }

        setUploadProblemImageLoading(true);
        setRateLimit(false);
        const url = await uploadFile(createProblemFileState.problemImage);
        console.log("problem url: ", url);
        // setUploadImageToast(true);
        setUploadProblemImageLoading(false);
        createProblemFileDispatch({
            type: createProblemFileActionType.SET_PROBLEM_IMAGE,
            payload: { problemImage: url },
        });
    }

    return (
        <div className="p-10">
            <Fields
                name="title"
                inputElement={
                    <input
                        type="text"
                        className="border-2"
                        onChange={handleTitleChange}
                    />
                }
            />
            <br />
            <Fields
                name="description"
                inputElement={
                    <textarea
                        className="border-2"
                        onChange={handleDescriptionChange}
                    />
                }
            />
            <br />
            <Fields
                name="problem image"
                inputElement={
                    <div className="space-x-4">
                        <input
                            type="file"
                            className="border-2"
                            onChange={handleProblemImageChange}
                            onClick={handleProblemImageClick}
                        />
                        <Button
                            variant="outlined"
                            onClick={handleProblemImageUpload}
                        >
                            {uploadProblemImageLoading ? "Uploading" : "Upload"}
                        </Button>
                    </div>
                }
            />
            <br />
            <Fields
                name="sample test cases"
                inputElement={
                    <AccordionCustom
                        prefix="TC #"
                        ReactComponent={SampleTestCase}
                    />
                }
            />
            <br />
            <Fields
                name="final test case"
                inputElement={
                    <div>
                        <div className="flex space-x-10">
                            <div className="space-x-10">
                                <label htmlFor="file">file</label>
                                <input
                                    id="file"
                                    type="file"
                                    className="border-2"
                                />
                            </div>
                            <div>
                                <Button variant="outlined">Upload</Button>
                            </div>
                        </div>
                    </div>
                }
            />
            <br />
            <Fields
                name="difficulty"
                inputElement={
                    <div className="flex space-x-4">
                        <label htmlFor="easy">Easy</label>
                        <input
                            id="easy"
                            name="difficulty"
                            type="radio"
                            value="easy"
                        />
                        <label htmlFor="medium">Medium</label>
                        <input
                            id="medium"
                            name="difficulty"
                            type="radio"
                            value="medium"
                        />
                        <label htmlFor="hard">Hard</label>
                        <input
                            id="hard"
                            name="difficulty"
                            type="radio"
                            value="hard"
                        />
                    </div>
                }
            />
            <br />
            <Fields
                name="constraints"
                inputElement={
                    <AccordionCustom
                        prefix="Constraint #"
                        ReactComponent={Constraint}
                    />
                }
            />
            <Fields
                name="topics"
                inputElement={
                    <AccordionCustom prefix="Topic #" ReactComponent={Topic} />
                }
            />
        </div>
    );
};
