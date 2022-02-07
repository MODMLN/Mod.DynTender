import React, { useRef } from "react";
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
import TenderLineDto from './Dtos/TenderLineDto';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

interface IProps {
    item: TenderLineDto
}

export default function TenderLine({ item }: IProps): JSX.Element {
    const [expand, setExpand] = React.useState(false);
    const fieldVal = useRef(null);
    const onClickHandler = (flag: boolean) => {
        const form = fieldVal.current;
        if (form != null && form['tenderSum'] != null) {

            // @ts-ignore: Object is possibly 'null'.
            if (form['tenderSum'].value !== "" && (form['tenderSum'].value !== undefined || form['tenderSum'].value !== 0)) {
                flag ?
                    // @ts-ignore: Object is possibly 'null'.
                    (form['tenderSum'].value = Number(form['tenderSum'].value) + 1)
                    :
                    // @ts-ignore: Object is possibly 'null'.
                    (form['tenderSum'].value = Number(form['tenderSum'].value) - 1);
            }
        }
    };


    const toggleAcordion = () => {
        setExpand((expand) => !expand);
    };



    return (
        <Box key={item.Index} className={Styles.TenderLine}>

            <Accordion sx={{ 'box-shadow': 'none' }}>
                <AccordionSummary
                    onClick={() => toggleAcordion()}
                    sx={{ direction: 'rtl', border: 'none' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component={'span'} >

                        <Box className={Styles.TenderLineHead}>
                            <Box className={Styles.title}>{item.TenderLineName}</Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box> <Box className={Styles.titleText}>
                                    מספר יחידות </Box>    <Box><b>{item.RequiredAmount}</b>
                                    </Box>   </Box>
                            }</Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box ><Box className={Styles.titleText}>
                                    מחיר ליחידה    </Box><Box ><b>{item.Price}</b>
                                    </Box> </Box>
                            }</Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box ><Box className={Styles.titleText}>
                                    סה"כ   </Box> <Box ><b>{item.TotalPriceForDisplay}</b>
                                    </Box> </Box>
                            }</Box>
                            <Box >
                                {(!expand && true) &&
                                    <Box className={`${Styles.Updated}`}>
                                        עודכן
                                    </Box>
                                }</Box>
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
                                    <Box className={Styles.stepNumber}><b>{item.PriceStep} ₪</b></Box>
                                </Box>
                                <Box className={Styles.unitPrice}>

                                    <Box className={Styles.stepTitle}>מחיר ליחידה</Box>
                                    <Box className={Styles.stepField}>
                                        <Box><IconButton sx={{ color: "#00798C" }} onClick={() => onClickHandler(true)}><AddCircleIcon /></IconButton></Box>
                                        <Box><TextField className={Styles.fildSum} type="number" id="standard-basic" label="₪" variant="standard" name={'tenderSum'} value={item.Price} /></Box>
                                        <Box><IconButton sx={{ color: "#00798C" }} onClick={() => onClickHandler(false)}><RemoveCircleIcon /></IconButton></Box>
                                    </Box>
                                </Box>
                                <Box className={Styles.sum}>
                                    <Box className={Styles.sumTitle}>סה"כ</Box>
                                    <Box className={Styles.sumNumber}>{item.TotalPriceForDisplay} ₪</Box>
                                </Box>
                            </Box>
                            <Box className={Styles.privilege}>
                                <Box><label className={Styles.titleLbl}>למימוש ההעדפות, יש להזין את מרכיבי המחיר ליחידה:</label></Box>
                                <Box sx={{ marginTop: '50px' }}>
                                    <Box className={Styles.inlineFlex}>
                                        <Box><label className={Styles.titleLbl} >עלות מרכיב תוצרת הארץ</label><Tooltip  placement="top-start" title="אינפורמציה מטורפת"><InfoOutlinedIcon sx={{ height: '14px' }} /></Tooltip></Box> 
                                        <Box></Box>
                                        <Box><TextField
                                            sx={{ width: '110px', border: '1px solid #44454B', backgroundColor:'#F4F8FF' }}
                                            disabled
                                            type="number"
                                            id="outlined-disabled"
                                            label={null}
                                            defaultValue=""
                                            variant="filled"
                                        />
                                        </Box>
                                </Box>
                                </Box>
                                <Box className={Styles.privilege}>
                                <Box sx={{ marginTop: '50px' }}>
                                        <Box className={Styles.inlineFlex}>
                                                <Box><label className={Styles.titleLbl}>מרכיב כח עבודה</label><Tooltip  placement="top-start" title="אינפורמציה מטורפת"><InfoOutlinedIcon sx={{ height: '14px' }} /></Tooltip></Box>
                                                <Box></Box>
                                                <Box><TextField
                                                    sx={{ width: '110px', border: '1px solid #44454B', backgroundColor:'#F4F8FF' }}
                                                    disabled
                                                    type="number"
                                                    id="outlined-disabled"
                                                    label={null}
                                                    defaultValue=""
                                                    variant="filled"
                                                />
                                                </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                </Box>
                        </form>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
