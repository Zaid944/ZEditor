import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

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
