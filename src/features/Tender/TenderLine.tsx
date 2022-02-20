import React, { useRef } from "react";
import { Box, InputAdornment } from "@mui/material";
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
import CurrencyFormat from 'react-number-format';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { setTotalSummery ,linePriceChanged} from "./TenderSlice";
import { RootState } from "../../app/store";

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useDispatch } from "react-redux";


interface IProps {
    item: TenderLineDto,
    AmountSign:string
}

export default function TenderLine({ item,AmountSign }: IProps): JSX.Element {
    //const TotalSummery = useAppSelector((state: RootState) => state.tenderdata.totalSummery);
    const dispatch = useDispatch();
    const [expand, setExpand] = React.useState(false);
    const fieldVal = useRef(null);

    const handleTotalPriceForDisplayChange = () => {

       // console.log('sdfsdfsdf')
    }

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
                            <Box className={Styles.headItem}>
                                <Box> <Box className={Styles.titleText}>
                                    {!item.IsPercentageCalculation ?
                                        <label>מספר יחידות</label>
                                        : <label>משקל</label>}
                                </Box>    <Box><b>{item.RequiredAmount}</b>{AmountSign}
                                    </Box>   </Box>
                            </Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box ><Box className={Styles.titleText} aria-label="מחיר ליחידה">
                                    מחיר ליחידה    </Box><Box ><b><CurrencyFormat decimalScale={2} value={item.Price} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></b>
                                    </Box> </Box>
                            }</Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box ><Box className={Styles.titleText}>
                                    סה"כ</Box><Box ><b><CurrencyFormat decimalScale={2} value={item.TotalPriceForDisplay} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></b>
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
                                    <Box className={Styles.stepTitle} aria-label="מדרגת הצעה">מדרגת הצעה</Box>
                                    <Box className={Styles.stepNumber}><b>{item.PriceStep} {item.CurrencyId}</b></Box>
                                </Box>
                                <Box className={Styles.unitPrice}>
                                    <Box className={Styles.stepTitle} aria-label="מחיר ליחידה">מחיר ליחידה {item.CurrencyId}</Box>
                                    <Box className={Styles.stepField}>
                                        <Box><IconButton sx={{ color: "#00798C" }} onClick={() => dispatch(linePriceChanged({TenderLineId: item.TenderLineId, actionType:"stepUp"}))}><AddCircleIcon /></IconButton></Box>
                                        <Box>
                                            <CurrencyFormat className={Styles.fildSum}   onValueChange={(values,sourceInfo) =>  {dispatch(linePriceChanged({TenderLineId: item.TenderLineId, val:values,  actionType:"priceChanged" }))}} displayType={"input"} decimalScale={2} value={item.Price} id="tenderSum" name={'tenderSum'}  ></CurrencyFormat>
                                        </Box>
                                        <Box><IconButton sx={{ color: "#00798C" }} onClick={() => dispatch(linePriceChanged({TenderLineId: item.TenderLineId, actionType:"stepDown"}))}><RemoveCircleIcon /></IconButton></Box>
                                    </Box>
                                </Box>
                                <Box className={Styles.sum}>
                                    <Box className={Styles.sumTitle}>סה"כ</Box>
                                    <Box className={Styles.sumNumber}>


                                        <FormControl fullWidth className={Styles.stepNumber} variant="standard">
                                            <Input
                                                disableUnderline={true}
                                                disabled
                                                className={Styles.stepNumber}
                                                id="TotalPriceForDisplay"
                                                value={item.TotalPriceForDisplay}
                                                onChange={handleTotalPriceForDisplayChange}
                                                startAdornment={<InputAdornment position="start">{item.CurrencyId}</InputAdornment>}
                                            />
                                        </FormControl>
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