import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export type FieldProps = {
    name: string;
    inputElement: React.ReactElement;
    left?: string;
    right?: string;
};

export const Fields: React.FC<FieldProps> = ({
    name,
    inputElement,
    left = "1/2",
    right = "1/2",
}) => {
    return (
        <div className="flex">
            <div className={`w-${left}`}>{name}</div>
            <div className={`w-${right}`}>{inputElement}</div>
        </div>
    );
};

export interface SampleTestCaseProps {
    name: string;
}

export const SampleTestCase: React.FC<SampleTestCaseProps> = ({ name }) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {name}
                </AccordionSummary>
                <AccordionDetails>
                    <Fields
                        name="image"
                        inputElement={
                            <div className="space-x-4 flex">
                                <Button variant="outlined">Upload</Button>
                                <input type="file" className="border-2" />
                            </div>
                        }
                        right="3/4"
                    />
                    <Fields
                        name="input"
                        inputElement={
                            <div className="space-x-4 flex">
                                <Button variant="outlined">Upload</Button>
                                <input type="file" className="border-2" />
                            </div>
                        }
                        right="3/4"
                    />
                    <Fields
                        name="output"
                        inputElement={
                            <div className="space-x-4 flex">
                                <Button variant="outlined">Upload</Button>
                                <input type="file" className="border-2" />
                            </div>
                        }
                        right="3/4"
                    />
                    <Fields
                        name="explanation"
                        inputElement={<textarea className="border-2" />}
                        right="3/4"
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export interface ConstraintProps {
    name: string;
}

export const Constraint: React.FC<ConstraintProps> = ({ name }) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {name}
                </AccordionSummary>
                <AccordionDetails>
                    <input type="text" className="border-2" />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

type AccordionCustomProps = {
    prefix: string;
    ReactComponent: React.FC<
        SampleTestCaseProps | ConstraintProps | TopicProps
    >;
};

export const AccordionCustom: React.FC<AccordionCustomProps> = ({
    prefix,
    ReactComponent,
}) => {
    const [accordionElements, setAccordionElements] = useState([
        { name: `${prefix}1` },
    ]);
    function handleAddClick() {
        const sampleTestCount = accordionElements.length;
        setAccordionElements([
            ...accordionElements,
            { name: `${prefix}${sampleTestCount + 1}` },
        ]);
    }
    function handleDeleteClick() {
        const sampleTestCaseTemp = [...accordionElements];
        sampleTestCaseTemp.pop();
        setAccordionElements(sampleTestCaseTemp);
    }
    return (
        <div className="flex w-full justify-between">
            <div className="w-full">
                {accordionElements.map((accordionElement, index) => {
                    return (
                        <ReactComponent
                            name={accordionElement.name}
                            key={index}
                        />
                    );
                })}
            </div>
            <IconButton onClick={handleAddClick}>
                <AddIcon />
            </IconButton>
            <IconButton
                onClick={handleDeleteClick}
                disabled={accordionElements.length === 1}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export interface TopicProps {
    name: string;
}

export const Topic: React.FC<TopicProps> = ({ name }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {name}
            </AccordionSummary>
            <AccordionDetails>
                <input type="text" className="border-2" />
            </AccordionDetails>
        </Accordion>
    );
};

export const EditProblem: React.FC = () => {
    return (
        <div className="p-10">
            <Fields
                name="title"
                inputElement={<input type="text" className="border-2" />}
            />
            <br />
            <Fields
                name="description"
                inputElement={<textarea className="border-2" />}
            />
            <br />
            <Fields
                name="problem image"
                inputElement={
                    <div className="space-x-4">
                        <input type="file" className="border-2" />
                        <Button variant="outlined">Upload</Button>
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
                            <div>
                                <label htmlFor="input">input</label>
                                <input
                                    id="input"
                                    type="file"
                                    className="border-2"
                                />
                            </div>
                            <div>
                                <Button variant="outlined">Upload</Button>
                            </div>
                        </div>
                        <div className="flex space-x-7">
                            <div>
                                <label htmlFor="output">output</label>
                                <input
                                    id="output"
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

/**
export const updateProblemSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    problemImage: z.string().optional(),
    sample_tc: z.array(testCaseSchema).optional(),
    final_tc: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    topics: z.array(z.string()).optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});

export const testCaseSchema = z.object({
    image: z.string().optional(),
    input: z.string(),
    output: z.string(),
    explanation: z.string(),
});
 */
