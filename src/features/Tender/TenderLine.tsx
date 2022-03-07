import React, { useEffect, useRef } from "react";
import { Box, TextField } from "@mui/material";
import Styles from './Tender.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import {TenderLineDto, IMessege} from './Dtos/TenderLineDto';
import CurrencyFormat from 'react-number-format';
import FormControl from '@mui/material/FormControl';
import { linePriceChanged } from "./TenderSlice";
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useForm,Controller} from "react-hook-form";

interface IProps {
    item: TenderLineDto,
    AmountSign: string
}

interface IFormInput {
    tenderSum: number;
}

export default function TenderLine({ item, AmountSign }: IProps): JSX.Element {




    const { register, setValue, control } = useForm<IFormInput>({mode: 'onBlur'});
    const dispatch = useDispatch();
    const [expand, setExpand] = React.useState(false);
    const [valCahnge, setValChange] = React.useState('');
    const [Price, setPrice] = React.useState("");
    const [snackbar, setSnackbar] = React.useState<IMessege>({ isOpen: false, messege: '' });
    const fieldVal = useRef(null);

    const handleTotalPriceForDisplayChange = () => {

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
                                        <Box>
                                            <IconButton sx={{ color: "#00798C" }} onClick={() => {
                                                let val = valCahnge ? parseFloat(valCahnge) : item.Price;
                                                if (val > item.MaxPrice) {
                                                    setSnackbar({ isOpen: true, messege: 'המחיר גבוה מהמחיר המקסימלי' });
                                                }
                                                dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, actionType: "stepUp" }))
                                            }}><AddCircleIcon /></IconButton></Box>
                                        <Box>

                                            <Controller
                                              
                                                name="tenderSum"
                                                control={control}
                                                defaultValue={item.Price}
                                                
                                                rules={{
                                                    pattern: {
                                                        value:
                                                            /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/,
                                                        message: 'Must use a valid Number',
                                                    },
                                                }}
                                                render={({ field: { onBlur, value }, fieldState: { error } }) => (
                                                    <TextField type="number" value={item.Price} placeholder={item.CurrencyId} {...register("tenderSum", {

                                                        valueAsNumber: true,
                                                       
                                                        onBlur: (e) => {
                                                            if ((parseFloat(e.target.value) < item.MinPrice || parseFloat(e.target.value) > item.MaxPrice) || parseFloat(e.target.value) < 0) {
                                                                setSnackbar({ isOpen: true, messege: 'המחיר אינו עומד בטווח שנקבע' });
                                                            }
                                                            else{
                                                                setSnackbar({ isOpen: false, messege: '' })
                                                            }
                                                            dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, val: e.target.value, actionType: "priceChanged" }));
                                                        }


                                                    })} />

                                                )}
                                            />

                                        </Box>
                                        <Box><IconButton sx={{ color: "#00798C" }} onClick={() => {
                                            let val = valCahnge ? parseFloat(valCahnge) : item.Price;
                                            if (val < item.MinPrice || val < 0) {
                                                setSnackbar({ isOpen: true, messege: 'המחיר נמוך מהמחיר המינימלי' });
                                            }

                                            dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, actionType: "stepDown" }))
                                        }
                                        }>
                                            <RemoveCircleIcon /></IconButton></Box>
                                    </Box>
                                </Box>
                                <Box className={Styles.sum}>
                                    <Box className={Styles.sumTitle}>סה"כ</Box>
                                    <Box className={Styles.sumNumber}>


                                        <FormControl fullWidth className={Styles.stepNumber} variant="standard">
                                            <CurrencyFormat disabled className={Styles.stepNumber} displayType={"input"} decimalScale={2} value={item.TotalPriceForDisplay} id="TotalPriceForDisplay" name={'TotalPriceForDisplay'}  ></CurrencyFormat>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                        <Snackbar sx={{ height: "100%" }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar.isOpen} autoHideDuration={6000} onBlur={()=>{ setSnackbar({ isOpen: false, messege: '' })}} onClose={()=>{ setSnackbar({ isOpen: false, messege: '' })}} >
                            <MuiAlert severity="error" sx={{ direction: "rtl", width: '100%' }} >
                                {snackbar.messege}
                            </MuiAlert>
                        </Snackbar>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}