import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import date from 'date-and-time';
import { useTranslation } from "react-multi-lang";
import Styles from './Tender.module.scss';
import TenderDto from './Dtos/TenderDto';
import { TenderLineDto } from './Dtos/TenderLineDto';
import { FormControl, IconButton, TextField, Tooltip } from "@mui/material";
import { AddCircle, RemoveCircle ,Feedback,Info} from "@mui/icons-material";


interface IProps {
  item: TenderDto
}

export default function TenderWithBenfitLine({ item }: IProps) {
  const Translation = useTranslation();

  return (
    <React.Fragment>
       <FormControl variant="standard" >
      {
      (item != null && item.Lines != null && item.Lines.length > 0) ?
          item.Lines.slice(0,1).map((itemx: TenderLineDto, indexx: number) => {
                            return (
                                <>
          <Box className={Styles.TenderWithBenfitLineContainer}>
            <Grid container justifyContent="center" className={Styles.TenderWithBenfitLine} >
              <Grid container item className={Styles.headText} wrap="nowrap">
                <Grid className={Styles.Title} item >{itemx.TenderLineName}</Grid>
                <Grid className={Styles.amount} item >          
                                  {!item.IsPercentageCalculation ?
                                            <label>{Translation('Tender.NUMBER_OF_UNITS')}</label>
                                            : <label>{Translation('Tender.WEIGHT')}</label>}
                                            &nbsp;{itemx.RequiredAmount}</Grid>
              </Grid>
              <Grid container item className={Styles.offerSteps} wrap="nowrap" alignItems="flex-end">
                <Grid item >
                  <Grid item>{Translation('Tender.PROPOSAL_RANK')}</Grid>
                  <Grid item className={Styles.Title}>{itemx.PriceStep} {itemx.CurrencyId}</Grid>
                </Grid>
                <Grid item className={Styles.unitPrice}>
                  <Grid item>{Translation('Tender.PROPOSAL_RANK')}</Grid>
                  <Grid item container className={Styles.TextField}>
                    <Grid item ><IconButton sx={{ color: "#00798C" }}  ><AddCircle /></IconButton></Grid>
                    <Grid item className={Styles.divTextField}>
                      <TextField
                        size="small"
                        variant="filled"
                        margin='normal'
                        fullWidth
                      ></TextField></Grid>
                    <Grid item ><IconButton sx={{ color: "#00798C" }} ><RemoveCircle /></IconButton></Grid>
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
        </>
        )})
        : ''}
        <Box className={Styles.TenderWithBenfitLineContainer}>
        <Grid className={Styles.BoxContainer}>
                <Grid container className={Styles.BoxSummery} justifyContent="center" >
                    <Grid container justifyContent="center" className={Styles.title}>{Translation('Tender.THE_AMOUNT_OF_YOUR_BID')}</Grid>
                    <Grid container justifyContent="center" className={Styles.summery}><CurrencyFormat  displayType={'text'} thousandSeparator={true}  decimalScale={2} /></Grid>
                    <Grid container justifyContent="center" className={Styles.buttonDiv}></Grid>
                        
         
                </Grid>
            </Grid >
        </Box>
      </FormControl>
    </React.Fragment>
  );
}