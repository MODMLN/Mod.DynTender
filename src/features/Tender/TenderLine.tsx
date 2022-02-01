import React from "react";
import { Box } from "@mui/material";
import Styles from './Tender.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

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
                        <Box>מספר יחידות  <b>1,000</b></Box>
                        <Box>מחיר ליחידה  <b>10,000</b></Box>
                        <Box>סה"כ  <b>100,000</b></Box>
                        <Box>עודכן</Box>
                    </Box>
                </Typography>
            </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box className={Styles.line}></Box>
                        <Box className={Styles.tenderSummery}>
                            <Box className={Styles.stepDiv}> 
                                <Box className={Styles.stepTitle}>מדרגת הצעה</Box>
                                <Box className={Styles.stepNumber}><b>50 ₪</b></Box>
                            </Box>
                            <Box className={Styles.unitPrice}>
                                <Box className={Styles.stepTitle}>מחיר ליחידה</Box>
                                <Box className={Styles.stepField}>
                                   <Box><IconButton><AddCircleIcon  /></IconButton></Box> 
                                   <Box><TextField id="standard-basic" label="₪" variant="standard" /></Box>
                                   <Box><IconButton><RemoveCircleIcon  /></IconButton></Box>
                                </Box>
                            </Box>
                            <Box></Box>
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
