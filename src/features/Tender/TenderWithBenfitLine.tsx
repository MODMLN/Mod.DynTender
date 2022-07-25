import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import date from 'date-and-time';
import { useTranslation } from "react-multi-lang";
import Styles from './Tender.module.scss';
import TenderDto from './Dtos/TenderDto';
import { IMessege, TenderLineDto } from './Dtos/TenderLineDto';
import { FormControl, IconButton, TextField, Tooltip } from "@mui/material";
import { AddCircle, RemoveCircle, Feedback, Info } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Global/UsersSlice";
import switchStatus from "./Commons/switchStatus";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { linePriceChanged } from "./TenderSlice";

interface IProps {
  item: TenderDto,
  itemx: TenderLineDto
}

export default function TenderWithBenfitLine({ item, itemx }: IProps) {



  const dispatch = useDispatch();
  const userDto = useSelector(selectUser);
  const Translation = useTranslation();
  const Statuses = switchStatus(item.Statuses);
  const [valStep, setValStep] = React.useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [valCahnge, setValChange] = React.useState('');
  const [snackbar, setSnackbar] = React.useState<IMessege>({ isOpen: false, messege: '' });

  useEffect(() => {

    setValue('tenderSum', valStep);
    if (item != null) {
      setValStep(itemx.Price);
      setPrice(valStep);
      reset(item);
    }
  }, [item]);

  const method = (value: any, helpers: any) => {
    if (value !== itemx.PreviousPrice) {
      let Diff = Math.abs(itemx.PreviousPrice - value);
      let newPrice = Diff - itemx.PriceStep;

      if (newPrice < 0) {
        let msg = value > itemx.PreviousPrice ? Translation('Tender.ValidationMsg.YOU_DIDNT_UP_STEP_AT_LAST') : Translation('Tender.ValidationMsg.YOU_DIDNT_DOWN_STEP_AT_LAST');
        return helpers.message(msg + " " + itemx.PriceStep);
      }

      if (value > itemx.MaxPrice || value < itemx.MinPrice) {
        setValStep(itemx.PreviousPrice);
        setValue('tenderSum', itemx.PreviousPrice, { shouldValidate: true })
        dispatch(linePriceChanged({ TenderLineId: itemx.TenderLineId, Price: itemx.PreviousPrice }));
      }
    }
    return value;
  };

  const schema = Joi.object({
    tenderSum: Joi.
      number().//message('מספר').
      positive().//message('חיובי').
      precision(2).//message('2 דצימלי').
      min(Math.max(2, itemx.MinPrice)).message(Translation('Tender.ValidationMsg.MinPriceErr') + " (" + itemx
        .MinPrice + ")").
      max(itemx.MaxPrice).message(Translation('Tender.ValidationMsg.MaxPriceErr') + " (" + itemx.MaxPrice + ")").
      //multiple(item.PriceStep).message('min.invalid').
      custom(method, 'custom validation').
      required()//.message('דרוש');

  }).options({ allowUnknown: true });//instead of adding non shown fields

  const { register, handleSubmit, reset, setValue, trigger, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    mode: 'onBlur', //'onBlur' 'onChange' 'onSubmit'[*default] 'onTouched' 'all'
  });

  return (
    <React.Fragment>
      <FormControl variant="standard" >
        {
          (item != null && item.Lines != null && item.Lines.length > 0) ?
            item.Lines.slice(0, 1).map((itemx: TenderLineDto, indexx: number) => {
              return (
                <>
                  <Box className={Styles.TenderWithBenfitLineContainer}>
                    <Grid container justifyContent="center" className={Styles.TenderWithBenfitLine} >
                      <Grid container item className={Styles.headText} wrap="nowrap">
                        <Grid className={Styles.Title} item >{itemx.TenderLineName}</Grid>
                        <Grid className={Styles.amount} item >
                          {!item.IsPercentageCalculation ?
                            <label>{Translation('Tender.AMOUNT')}</label>
                            : <label>{Translation('Tender.WEIGHT')}</label>}
                          &nbsp;{itemx.RequiredAmount}</Grid>
                      </Grid>
                      <Grid container item className={Styles.offerSteps} wrap="nowrap" alignItems="flex-end">
                        <Grid item >
                          <Grid item>{Translation('Tender.PROPOSAL_RANK')}</Grid>
                          <Grid item className={Styles.Title}>{itemx.PriceStep} {itemx.CurrencyId}</Grid>
                        </Grid>
                        <Grid item className={Styles.unitPrice}>
                          <Grid item>{Translation('Tender.UNIT_PRICE_MUST_BE_ENTERED')}</Grid>
                          <Grid item container className={Styles.TextField}>
                            <Grid item ><IconButton sx={{ color: "#00798C" }}
                              onClick={() => {
                                let val = valCahnge ? parseFloat(valCahnge) : itemx.Price;
                                if (val > itemx.MaxPrice) {
                                  setSnackbar({ isOpen: true, messege: Translation('Tender.PRICE_IS_HIGHER_THAN_THE_MAXIMUM') });
                                };

                                const newVal = Number(valStep) + Number(itemx.PriceStep);
                                setValStep(newVal);
                                setValue('tenderSum', newVal, { shouldValidate: true });

                                dispatch(linePriceChanged({ TenderLineId: itemx.TenderLineId, Price: newVal }));
                              }}><AddCircle /></IconButton></Grid>
                            <Grid item className={Styles.divTextField}>
                              <TextField
                                defaultValue={valStep ? Number(valStep).toFixed(2) : ''}
                                {...register('tenderSum')} placeholder={itemx.CurrencyId}
                                onChange={(e) => {
                                  setValStep(Number(e.target.value))
                                  dispatch(linePriceChanged({ TenderLineId: itemx.TenderLineId, Price: e.target.value }));
                                }}

                                onBlur={(e) => {
                                  setValue('tenderSum', e.target.value, { shouldValidate: true })
                                  dispatch(linePriceChanged({ TenderLineId: itemx.TenderLineId, Price: e.target.value }));
                                }}
                                type={'text'}
                                size="small"
                                variant="filled"
                                margin='normal'
                                fullWidth
                              ></TextField></Grid>
                            <Grid item ><IconButton sx={{ color: "#00798C" }} onClick={() => {
                              let val = valCahnge ? parseFloat(valCahnge) : itemx.Price;
                              if (val < itemx.MinPrice || val < 0) {
                                setSnackbar({ isOpen: true, messege: Translation('Tender.PRICE_IS_LOWER_THAN_THE_MINIMUM') });
                              }
                              const newVal = Number(valStep) - Number(itemx.PriceStep);
                              setValStep(newVal);
                              setValue('tenderSum', newVal, { shouldValidate: true });

                              dispatch(linePriceChanged({ TenderLineId: itemx.TenderLineId, Price: newVal }));
                            }
                            }><RemoveCircle /></IconButton></Grid>
                          </Grid>
                        </Grid>
                        <Grid item >
                          <Grid item className={Styles.iconMessage}><Feedback color='primary'></Feedback></Grid>
                          <Grid item className={Styles.message}>{Translation('Tender.POSSIBILITY_OF_LINE_OF_CONFLICT')}</Grid>
                        </Grid>

                      </Grid>
                      <Grid container item className={Styles.offerStepsGray} wrap="nowrap" alignItems="flex-end">
                        <Grid container alignItems="center" className={Styles.objectCost}>
                          <Grid item >{Translation('Tender.EXERCISE_THE_PREFERENCES')}</Grid>
                        </Grid>
                        <Grid container item >
                          <Grid item >
                            <TextField
                              size="small"
                              variant="outlined"
                              margin='normal'
                              fullWidth
                            ></TextField></Grid>
                        </Grid>
                      </Grid>
                      <Grid container className={Styles.offerStepsGray} wrap="nowrap" alignItems="flex-end">
                        <Grid container alignItems="center" className={Styles.objectCost}>
                          <Grid item >{Translation('Tender.THE_COST_OF_DOMESTICALLY')}</Grid>
                          <Grid item >&nbsp;<Tooltip title="הסבר מפורט יופיע כאן " placement="top-start"><Info color="primary"></Info></Tooltip></Grid>
                        </Grid>

                        <Grid container item >
                          <Grid item >
                            <TextField
                              color="success"
                              size="small"
                              variant="outlined"
                              margin='normal'
                              fullWidth
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className={Styles.TenderWithBenfitLineContainer}>
                    <Grid className={Styles.BoxContainer}>
                      <Grid container className={Styles.BoxSummery} justifyContent="center" >
                        <Grid container justifyContent="center" alignItems={'center'}>
                          <Grid item justifyContent="center" className={Styles.item}>
                            <Grid item justifyContent="center" className={Styles.title}>בניכוי העדפה לאומית</Grid>
                            <Grid item justifyContent="center" className={Styles.summery}><CurrencyFormat displayType={'text'} thousandSeparator={true} decimalScale={2} />
                              {itemx.TotalWithLocationBenefit}</Grid>
                          </Grid>
                          <Grid item justifyContent="center" className={Styles.item}>
                            <Grid item justifyContent="center" className={Styles.title}>בניכוי תוצרת הארץ</Grid>
                            <Grid item justifyContent="center" className={Styles.summery}><CurrencyFormat displayType={'text'} thousandSeparator={true} decimalScale={2} />
                              {itemx.TotalForLocalWork}</Grid>
                          </Grid>
                          <Grid item justifyContent="center" className={Styles.item}>
                            <Grid item justifyContent="center" className={Styles.title}>{Translation('Tender.THE_AMOUNT_OF_YOUR_BID')}</Grid>
                            <Grid item justifyContent="center" className={Styles.summery}><CurrencyFormat displayType={'text'} thousandSeparator={true} decimalScale={2} />
                              {itemx.TotalWithoutBenefits}</Grid>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent="center" className={Styles.buttonDiv}>
                          <Grid item sx={{ width: '100%' }}>
                            <Button className={Styles.Button} variant="contained">{Translation('Tender.BID_SUBMISSION')}</Button></Grid>

                        </Grid>


                      </Grid>
                    </Grid >
                  </Box>
                </>
              )
            })
            : ''}

      </FormControl>
    </React.Fragment>
  );
}