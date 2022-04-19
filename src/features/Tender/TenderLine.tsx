import React, { useEffect, useState } from "react";
import {
    Box, Accordion, AccordionSummary, AccordionDetails,
    Typography, IconButton, FormControl, Snackbar, Alert,
    TextField,
    Grid
} from "@mui/material";
import Styles from './Tender.module.scss';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TenderLineDto, IMessege } from './Dtos/TenderLineDto';
import CurrencyFormat from 'react-number-format';
import { linePriceChanged } from "./TenderSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-multi-lang";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { BrowserView, MobileView } from 'react-device-detect';

interface IProps {
    item: TenderLineDto,
    AmountSign?: string,
    status: string
}

export default function TenderLine({ item, AmountSign, status }: IProps): JSX.Element {
    const Translation = useTranslation();
    const dispatch = useDispatch();
    const [expand, setExpand] = React.useState(false);
    const [valCahnge, setValChange] = React.useState('');
    const [snackbar, setSnackbar] = React.useState<IMessege>({ isOpen: false, messege: '' });
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setValue('tenderSum', item.Price);
        if (item != null) {
            setPrice(item.Price);
            reset(item);
        }
    }, [item]);

    const schema = Joi.object({
        tenderSum: Joi.number().positive().precision(2).min(Math.max(0, item.MinPrice)).max(item.MaxPrice).required(),

    }).options({ allowUnknown: true });//instead of adding non shown fields

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
        mode: 'onBlur', //'onBlur' 'onChange' 'onSubmit'[*default] 'onTouched' 'all'
    });

    const onSubmit = async (data: any, event: (React.BaseSyntheticEvent | undefined)) => {
        if (event != null)
            event.stopPropagation();
    };

    return (
        <Box key={item.Index} className={Styles.TenderLine}>
            <Accordion className={Styles.Accordion} expanded={expand} >
                <AccordionSummary
                    className={Styles.AccordionSummary}
                    onClick={() => (status !== 'Ended' && status !== 'Decoded') ? setExpand((expand) => !expand) : null}
                    expandIcon={
                        (status !== 'Ended' && status !== 'Decoded') ? <KeyboardArrowDownIcon /> : null
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Grid container className={Styles.TenderLineHead}>
                        <Grid item justifyContent="flex-end" md={4} className={Styles.title}>{item.TenderLineName}</Grid>

                        <Grid item  md={1}  className={Styles.headItem}>
                            <Grid>
                                <Grid className={Styles.titleText}>
                                    {!item.IsPercentageCalculation ?
                                        <label>{Translation('Tender.NUMBER_OF_UNITS')}</label>
                                        : <label>{Translation('Tender.WEIGHT')}</label>}
                                </Grid>
                                <Grid><b>{item.RequiredAmount}</b>{AmountSign}</Grid>
                            </Grid>
                            {/* AMOUNT */}
                        </Grid>
                        {!expand &&
                            
                                <BrowserView>
                                    <Grid  container  >
                                        <Grid   className={Styles.headItem}  >
                                            <Grid   className={Styles.titleText} >
                                                {Translation('Tender.PRICE_PER_UNIT')}
                                            </Grid>
                                            <Grid  >
                                                <b><CurrencyFormat decimalScale={2} value={item.Price} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></b>
                                            </Grid>

                                        </Grid>
                                        <Grid   className={Styles.headItem} >
                                            <Grid   item className={Styles.titleText}>{Translation('Tender.TOTAL')}</Grid>
                                            <Grid   item><b><CurrencyFormat decimalScale={2} value={item.TotalPriceForDisplay} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></b></Grid>
                                        </Grid>
                                    </Grid>
                                </BrowserView>
                           
                        }
                        {item.isUpdated &&
                            <Grid item md={2}>
                                <BrowserView><Grid item className={`${Styles.Updated}`}>{Translation('Tender.UPDATED')}</Grid></BrowserView>
                            </Grid>
                        }

                    </Grid>
                </AccordionSummary>
                <AccordionDetails className={Styles.AccordionDetails} >
                    <Typography className={Styles.Typography} component={'span'} >
                        {/* <form ref={fieldVal}> */}
                        <Box className={Styles.line}></Box>
                        <Grid container className={Styles.tenderSummery}>
                            <Grid className={Styles.stepDiv}>
                                <Grid item className={Styles.stepTitle} aria-label={Translation('Tender.PROPOSAL_RANK')}>{Translation('Tender.PROPOSAL_RANK')}</Grid>
                                <Grid item className={Styles.stepNumber}><b>{item.PriceStep} {item.CurrencyId}</b></Grid>
                            </Grid>
                            <Grid className={Styles.unitPrice}>
                                <Grid item className={Styles.stepTitle} aria-label={Translation('Tender.PRICE_PER_UNIT')}></Grid>
                                <Grid item className={Styles.stepField}>
                                    <Grid item>
                                        <IconButton sx={{ color: "#00798C" }} onClick={() => {
                                            let val = valCahnge ? parseFloat(valCahnge) : item.Price;
                                            if (val > item.MaxPrice) {
                                                setSnackbar({ isOpen: true, messege: Translation('Tender.PRICE_IS_HIGHER_THAN_THE_MAXIMUM') });
                                            }
                                            dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, actionType: "stepUp" }))
                                        }}><AddCircle /></IconButton></Grid>
                                    <Grid component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                        <TextField defaultValue={item.Price ? parseFloat(String(item.Price)).toFixed(2) : ''} {...register('tenderSum')} placeholder={item.CurrencyId}
                                            type={'text'}
                                            label={Translation('Tender.PRICE_PER_UNIT') + ' ' + item.CurrencyId}
                                            variant="filled"
                                            margin='normal'
                                            error={errors.tenderSum != null}
                                            helperText={errors.tenderSum == null ? null : errors.tenderSum?.message}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid><IconButton sx={{ color: "#00798C" }} onClick={() => {
                                        let val = valCahnge ? parseFloat(valCahnge) : item.Price;
                                        if (val < item.MinPrice || val < 0) {
                                            setSnackbar({ isOpen: true, messege: Translation('Tender.PRICE_IS_LOWER_THAN_THE_MINIMUM') });
                                        }

                                        dispatch(linePriceChanged({ TenderLineId: item.TenderLineId, actionType: "stepDown" }))
                                    }
                                    }>
                                        <RemoveCircle /></IconButton></Grid>
                                </Grid>
                            </Grid>
                            <Grid className={Styles.sum}>
                                <Grid item className={Styles.sumTitle}>{Translation('Tender.TOTAL')}</Grid>
                                <Grid item className={Styles.sumNumber}>
                                    <FormControl fullWidth className={Styles.stepNumber} variant="standard">
                                        <CurrencyFormat disabled className={Styles.stepNumber} displayType={"text"} decimalScale={2} value={item.TotalPriceForDisplay} id="TotalPriceForDisplay" name={'TotalPriceForDisplay'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
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