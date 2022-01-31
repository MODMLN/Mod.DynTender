import React from "react";
import { Box } from "@mui/material";
import Styles from './Tender.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





export default function TenderLine(): JSX.Element {

    return (
        <Box className={Styles.TenderLine}>

            <Accordion sx={{ 'box-shadow': 'none' }}><AccordionSummary
                sx={{ direction: 'rtl', border: 'none' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    <Box className={Styles.TenderLineHead}>
                        <Box className={Styles.title}>ארונית ניידת לשינוע מזון</Box>
                        <Box>מספר יחידות <b>1,000</b></Box>
                        <Box>מחיר ליחידה <b>10,000</b></Box>
                        <Box>סה"כ <b>100,000</b></Box>
                        <Box>עודכן</Box>
                        <Box></Box>
                    </Box>
                </Typography>
            </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
