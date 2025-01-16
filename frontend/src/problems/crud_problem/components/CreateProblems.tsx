import { Button, IconButton } from "@mui/material";
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
import { RadioGroup } from "./fields/RadioGroup";
import { useRadio } from "../../../common/hooks/useRadio";
import { Difficulty } from "@zeditor/common";
import BackupIcon from "@mui/icons-material/Backup";

export const CreateProblems: React.FC = () => {
    const [uploadFile] = useFile();

    const [createProblemState, createProblemDispatch] = useReducer(
        createProblemReducer,
        createProblemInitialState
    );

    console.log("state is: ", createProblemState);

    const [createProblemFileState, createProblemFileDispatch] = useReducer(
        createProblemFileReducer,
        createProblemFileInitialState
    );

    const [uploadProblemImageLoading, setUploadProblemImageLoading] =
        useState(false);
    const [uploadFinalTestCaseLoading, setUploadFinalTestCaseLoading] =
        useState(false);

    const [rateLimit1, setRateLimit1] = useState(true);
    const [rateLimit2, setRateLimit2] = useState(true);

    const radioButtonOptions = [
        { label: "Easy", id: "easy", value: Difficulty.Enum.EASY },
        { label: "Medium", id: "medium", value: Difficulty.Enum.MEDIUM },
        { label: "Hard", id: "hard", value: Difficulty.Enum.HARD },
    ];

    const [value, inputProps] = useRadio("difficulty", Difficulty.Enum.EASY);
    console.log("radio option is: ", value);

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

        setRateLimit1(true);
        createProblemFileDispatch({
            type: createProblemFileActionType.SET_PROBLEM_IMAGE,
            payload: {
                problemImage: e.target.files[0],
            },
        });
    }

    async function handleProblemImageUpload() {
        if (!(createProblemFileState.problemImage && rateLimit1)) {
            return;
        }

        setUploadProblemImageLoading(true);
        setRateLimit1(false);
        const url = await uploadFile(createProblemFileState.problemImage);
        console.log("problem url: ", url);
        // setUploadImageToast(true);
        setUploadProblemImageLoading(false);
        createProblemFileDispatch({
            type: createProblemFileActionType.SET_PROBLEM_IMAGE,
            payload: { problemImage: url },
        });
    }

    function handleFinalTestCaseInputChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        if (!e.target.files) {
            return;
        }

        setRateLimit2(true);
        createProblemFileDispatch({
            type: createProblemFileActionType.SET_FINAL_TC,
            payload: {
                final_tc: e.target.files[0],
            },
        });
    }

    function handleFinalTestCaseInputClick(
        e: React.MouseEvent<HTMLInputElement>
    ) {
        (e.target as HTMLInputElement).value = "";
    }

    async function handleFinalTestCaseUpload() {
        if (!(createProblemFileState.final_tc && rateLimit2)) {
            return;
        }

        setUploadFinalTestCaseLoading(true);
        setRateLimit2(false);
        const url = await uploadFile(createProblemFileState.final_tc);
        console.log("problem url: ", url);
        // setUploadImageToast(true);
        setUploadFinalTestCaseLoading(false);
        createProblemFileDispatch({
            type: createProblemFileActionType.SET_FINAL_TC,
            payload: { final_tc: url },
        });
    }

    function handleDifficultyChange() {
        createProblemDispatch({
            type: createProblemActionType.SET_DIFFICULTY,
            payload: {
                ...createProblemState,
                difficulty: value,
            },
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
                        createProblemDispatch={createProblemDispatch}
                        action={createProblemActionType.SET_SAMPLE_TC}
                        createProblemState={createProblemState}
                        field="sample_tc"
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
                                    onChange={handleFinalTestCaseInputChange}
                                    onClick={handleFinalTestCaseInputClick}
                                    id="file"
                                    type="file"
                                    className="border-2"
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={handleFinalTestCaseUpload}
                                    variant="outlined"
                                >
                                    {uploadFinalTestCaseLoading
                                        ? "Uploading"
                                        : "Upload"}
                                </Button>
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
                        {radioButtonOptions.map((option, index) => (
                            <RadioGroup
                                key={index}
                                label={option.label}
                                id={option.id}
                                value={option.value}
                                checked={value === option.value}
                                type={inputProps.type}
                                name={inputProps.name}
                                onChange={inputProps.onChange}
                            />
                        ))}
                        <IconButton onClick={handleDifficultyChange}>
                            <BackupIcon />
                        </IconButton>
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
                        createProblemDispatch={createProblemDispatch}
                        createProblemState={createProblemState}
                        field="constraints"
                        action={createProblemActionType.SET_CONSTRAINTS}
                    />
                }
            />
            <Fields
                name="topics"
                inputElement={
                    <AccordionCustom
                        prefix="Topic #"
                        ReactComponent={Topic}
                        createProblemDispatch={createProblemDispatch}
                        createProblemState={createProblemState}
                        field="topics"
                        action={createProblemActionType.SET_TOPICS}
                    />
                }
            />
        </div>
    );
};
