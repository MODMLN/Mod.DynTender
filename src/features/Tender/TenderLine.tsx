import React, { useEffect, useRef,useState } from "react";
import { 
    Box ,Accordion ,AccordionSummary,AccordionDetails,
    Typography,IconButton,FormControl,Snackbar,Alert,
    TextField
} from "@mui/material";
import Styles from './Tender.module.scss';
import {ExpandMore , AddCircle,RemoveCircle} from '@mui/icons-material';
import { TenderLineDto, IMessege } from './Dtos/TenderLineDto';
import CurrencyFormat from 'react-number-format';
import { linePriceChanged } from "./TenderSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-multi-lang";
import Joi from "joi";
import {joiResolver} from "@hookform/resolvers/joi";

interface IProps {
    item: TenderLineDto,
    AmountSign: string
}

export default function TenderLine({ item, AmountSign }: IProps): JSX.Element {
    const Translation = useTranslation();
    const dispatch = useDispatch();
    const [expand, setExpand] = React.useState(false);
    const [valCahnge, setValChange] = React.useState('');

    const [snackbar, setSnackbar] = React.useState<IMessege>({ isOpen: false, messege: '' });
   // const fieldVal = useRef(null);

   const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setValue('tenderSum', item.Price);
        if (item != null) {
            setPrice(item.Price);
         reset(item);}
        }
    ,[item]);

    const toggleAcordion = () => {
        setExpand((expand) => !expand);
    };

    const schema = Joi.object({
        tenderSum: Joi.number().positive().precision(2).min(Math.max(0,item.MinPrice)).max(item.MaxPrice).required(),

    }).options({allowUnknown: true});//instead of adding non shown fields

    const {register, handleSubmit, watch, reset, resetField, setValue, formState: {errors}} = useForm({
        resolver: joiResolver(schema),
        mode: 'onBlur', //'onBlur' 'onChange' 'onSubmit'[*default] 'onTouched' 'all'
    });
    const onSubmit = async (data: any, event: (React.BaseSyntheticEvent | undefined)) => {
        if (event != null)
            event.stopPropagation();
    };

    return (
        <Box key={item.Index} className={Styles.TenderLine}>
            <Accordion sx={{ 'box-shadow': 'none' }}>
                <AccordionSummary
                    onClick={() => toggleAcordion()}
                    sx={{ direction: 'rtl', border: 'none' }}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography component={'span'} >
                        <Box className={Styles.TenderLineHead}>
                            <Box className={Styles.title}>{item.TenderLineName}</Box>
                            <Box className={Styles.headItem}>
                                <Box> <Box className={Styles.titleText}>
                                    {!item.IsPercentageCalculation ?
                                        <label>{Translation('Tender.NUMBER_OF_UNITS')}</label>
                                        : <label>{Translation('Tender.WEIGHT')}</label>}
                                </Box>    <Box><b>{item.RequiredAmount}</b>{AmountSign}
                                    </Box>   </Box>
                            </Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box ><Box className={Styles.titleText} aria-label={Translation('Tender.PRICE_PER_UNIT')} >
                                    {Translation('Tender.PRICE_PER_UNIT')}    </Box><Box ><b><CurrencyFormat decimalScale={2} value={item.Price} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></b>
                                    </Box> </Box>
                            }</Box>
                            <Box className={Styles.headItem}>{!expand &&
                                <Box ><Box className={Styles.titleText}>
                                   {Translation('Tender.TOTAL')}</Box><Box ><b><CurrencyFormat decimalScale={2} value={item.TotalPriceForDisplay} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></b>
                                    </Box> </Box>
                            }</Box>
                            <Box >
                                {(!expand && item.isUpdated) &&
                                    <Box className={`${Styles.Updated}`}>
                                        {Translation('Tender.UPDATED')}
                                    </Box>
                                }</Box>
                        </Box>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ 'text-align': 'right' }}>
                    <Typography sx={{ 'text-align': 'right' }} component={'span'} >
                        {/* <form ref={fieldVal}> */}
                            <Box className={Styles.line}></Box>
                            <Box className={Styles.tenderSummery}>
                                <Box className={Styles.stepDiv}>
                                    <Box className={Styles.stepTitle} aria-label={Translation('Tender.PROPOSAL_RANK')}>{Translation('Tender.PROPOSAL_RANK')}</Box>
                                    <Box className={Styles.stepNumber}><b>{item.PriceStep} {item.CurrencyId}</b></Box>
                                </Box>
                                <Box className={Styles.unitPrice}>
                                    <Box className={Styles.stepTitle} aria-label={Translation('Tender.PRICE_PER_UNIT')}>{Translation('Tender.PRICE_PER_UNIT')}  {item.CurrencyId}</Box>
                                    <Box className={Styles.stepField}>
                                        <Box>
                                            <IconButton sx={{ color: "#00798C" }} onClick={() => {
                                                let val = valCahnge ? parseFloat(valCahnge) : item.Price;
                                                if (val > item.MaxPrice) {
                                                    setSnackbar({ isOpen: true, messege: Translation('Tender.PRICE_IS_HIGHER_THAN_THE_MAXIMUM') });
                                                }
                                                dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, actionType: "stepUp" }))
                                            }}><AddCircle /></IconButton></Box>
<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
                    <TextField defaultValue={item.Price ? parseFloat(String(item.Price)).toFixed(2) : ''} {...register('tenderSum')} placeholder={item.CurrencyId}
                               type={'text'}
                               label="מחיר ליחידה"
                               variant="filled"
                               margin='normal'
                               error = {errors.tenderSum != null}
                               helperText={errors.tenderSum == null ?null:errors.tenderSum?.message}
                               fullWidth
                    />
                    </Box>

                                  

                                        <Box><IconButton sx={{ color: "#00798C" }} onClick={() => {
                                            let val = valCahnge ? parseFloat(valCahnge) : item.Price;
                                            if (val < item.MinPrice || val < 0) {
                                                setSnackbar({ isOpen: true, messege:Translation('Tender.PRICE_IS_LOWER_THAN_THE_MINIMUM') });
                                            }

                                            dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, actionType: "stepDown" }))
                                        }
                                        }>
                                            <RemoveCircle /></IconButton></Box>
                                    </Box>
                                </Box>
                                <Box className={Styles.sum}>
                                    <Box className={Styles.sumTitle}>{Translation('Tender.TOTAL')}</Box>
                                    <Box className={Styles.sumNumber}>
                                        <FormControl fullWidth className={Styles.stepNumber} variant="standard">
                                            <CurrencyFormat disabled className={Styles.stepNumber} displayType={"input"} decimalScale={2} value={item.TotalPriceForDisplay} id="TotalPriceForDisplay" name={'TotalPriceForDisplay'}  ></CurrencyFormat>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        {/* </form> */}
                        <Snackbar sx={{ height: "100%" }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar.isOpen} autoHideDuration={6000} onBlur={() => { setSnackbar({ isOpen: false, messege: '' }) }} onClose={() => { setSnackbar({ isOpen: false, messege: '' }) }} >
                            <Alert severity="error" sx={{ direction: "rtl", width: '100%' }} >
                                {snackbar.messege}
                            </Alert>
                        </Snackbar>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}