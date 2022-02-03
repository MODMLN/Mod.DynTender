import React, {  useRef } from "react";
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
import TenderLineDto  from './Dtos/TenderLineDto';


export default function TenderLine(): JSX.Element {

    const fieldVal = useRef(null);
    const onClickHandler = (flag:boolean) => {
        const form = fieldVal.current;
        if(form!=null && form['tenderSum']!=null){

             // @ts-ignore: Object is possibly 'null'.
           if(form['tenderSum'].value===""  && (form['tenderSum'].value===undefined  || form['tenderSum'].value!==0)){
            flag?
             // @ts-ignore: Object is possibly 'null'.
            (form['tenderSum'].value =Number(form['tenderSum'].value)+1)
            :
             // @ts-ignore: Object is possibly 'null'.
            (form['tenderSum'].value =Number(form['tenderSum'].value)-1);
        }
    }
      };

    return (
        <Box className={Styles.TenderLine}>

            <Accordion sx={{ 'box-shadow': 'none' }}><AccordionSummary
                sx={{ direction: 'rtl', border: 'none' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography component={'span'} >
                
                    <Box className={Styles.TenderLineHead}>
                        <Box className={Styles.title}>ארונית ניידת לשינוע מזון</Box>
                        <Box>מספר יחידות  <b>1,000</b></Box>
                        <Box>מחיר ליחידה  <b>10,000</b></Box>
                        <Box>סה"כ  <b>100,000</b></Box>
                        <Box className={Styles.Updated}>עודכן</Box>
                    </Box>
                  
                </Typography>
            </AccordionSummary>
                <AccordionDetails sx={{ 'text-align': 'right' }}>
                    <Typography sx={{ 'text-align': 'right' }} component={'span'} >
                    <form ref={fieldVal}>
                        <Box className={Styles.line}></Box>
                        <Box className={Styles.tenderSummery}>
                            <Box className={Styles.stepDiv}>
                                <Box className={Styles.stepTitle}>מדרגת הצעה</Box>
                                <Box className={Styles.stepNumber}><b>50 ₪</b></Box>
                            </Box>
                            <Box className={Styles.unitPrice}>
                               
                                <Box className={Styles.stepTitle}>מחיר ליחידה</Box>
                                <Box className={Styles.stepField}>
                                    <Box><IconButton  onClick={()=>onClickHandler(true)}><AddCircleIcon /></IconButton></Box>
                                    <Box><TextField type="number" id="standard-basic" label="₪"  variant="standard"  name={'tenderSum'}  /></Box>
                                    <Box><IconButton onClick={()=>onClickHandler(false)}><RemoveCircleIcon /></IconButton></Box>
                                </Box>
                            </Box>
                            <Box className={Styles.sum}>
                                <Box className={Styles.sumTitle}>סה"כ</Box>
                                <Box className={Styles.sumNumber}> ₪</Box>
                            </Box>
                        </Box>
                        </form>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
