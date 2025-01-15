import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

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
