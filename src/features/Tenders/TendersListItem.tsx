import React from "react";
import TendersDto from './Dtos/TendersDto';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Styles from './Tenders.module.scss'
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import date from 'date-and-time';
import { useTranslation } from "react-multi-lang";
import TenderStartTime from './../component/tenderStartTime';

interface IProps {
    item: TendersDto, index: number, redirectOnClick: boolean
}

export default function TendersListItem({ item, index, redirectOnClick = true }: IProps) {
    const Translation = useTranslation();
    let navigate = useNavigate();
    let time = item.Time?date.format(new Date(item.Time), 'HH:mm:ss'):null;
    let statusColumnsClass = Styles[item.Statuses];

  
   
    let lastColumn = <React.Fragment>
                        <Grid md={2} item  className={Styles.TenderNumber}>{Translation('Tender.NUMBER')}: {item.TenderNumber}</Grid>
                        <Grid md={2} item><Button className={statusColumnsClass} variant="contained">{Translation(`Tender.${item.Statuses}`)}</Button></Grid>
                        
                        </React.Fragment>;

    if(item.Statuses === "Going"){
        lastColumn = <React.Fragment>
                        <Grid md={2} item  className={Styles.TenderNumber}>{Translation('Tender.NUMBER')}: {item.TenderNumber}</Grid>
                        <Grid md={1} item>
                            <Button variant="contained">{time}</Button>
                        </Grid>
                        <Grid md={2} item>
                            <Button className={statusColumnsClass} variant="contained">{Translation(`Tender.${item.Statuses}`)}</Button>
                        </Grid>
                       
                    </React.Fragment>
    }
   
    return (
        <Box onClick={
            (e) => {
                if (redirectOnClick)
                    navigate(`/Tender/${item.Id}`);
            }
        }>
            <Grid container className={Styles.BoxMain} key={index} sx={{ p: 2 }}>
                <Grid item container className={Styles.BoxHead + ` Active`}  direction="row-reverse" justifyContent="flex-end">
                    <Grid  md={7} item className={Styles.headText}>{item.Name}</Grid>
                   
                        
                        <Grid md={3} item className={Styles.lastColumn} container  direction="row-reverse" >{lastColumn}</Grid>
               
                </Grid>
                <Box className={Styles.line}></Box> 
                {
                    (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (
                        <>
                            <Grid justifyContent="flex-end" direction="row-reverse" container alignItems="center" >
                                <Grid justifyContent="flex-end" container>{Translation('Tender.OPENING_TIME')}</Grid>
                                <Grid justifyContent="flex-end" container className={Styles.bold}>{item.StartDate}</Grid>
                                <Grid justifyContent="flex-end" container><TenderStartTime key={index} item={item.Time}   /></Grid>
                            </Grid>
                            <Box className={Styles.line}></Box>
                        </>
                    ) : (<><Box className={Styles.High40} ><span></span></Box></>)
                }
                <Grid direction="row" justifyContent="flex-end"  container  className={Styles.Proposal} >
                    <Grid item container className={Styles.leadPrice} justifyContent="flex-end" direction="row">
                        <Grid container item direction="row" justifyContent="flex-end">{Translation('Tender.LEADING_PRICE')}</Grid>
                        <Grid container item direction="row" justifyContent="flex-end" className={Styles.bold}><CurrencyFormat decimalScale={2} value={item.TotalToLead} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></Grid>
                    </Grid>
                    <Grid item container className={Styles.greenProposal} justifyContent="flex-end" direction="row">
                        <Grid container item direction="row" justifyContent="flex-end">{Translation('Tender.YOUR_OFFER_LEADS')}</Grid>
                        <Grid container item direction="row" justifyContent="flex-end" className={Styles.bold}><CurrencyFormat decimalScale={2} value={item.TotalToLead} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></Grid></Grid>
                </Grid>
            </Grid>
        </Box>
    )
}


