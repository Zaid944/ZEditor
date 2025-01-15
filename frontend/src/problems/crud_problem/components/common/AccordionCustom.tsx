import { SampleTestCaseProps } from "../fields/SampleTestCase";
import { ConstraintProps } from "../fields/Constraint";
import { TopicProps } from "../fields/Topic";
import { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
