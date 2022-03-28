import React from "react";
import TendersDto from './Dtos/TendersDto';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Styles from './Tenders.module.scss'
import Moment from 'react-moment';
import {  useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import date from 'date-and-time';
import { useTranslation } from "react-multi-lang";

interface IProps {
    item: TendersDto, index: number, redirectOnClick: boolean
}

export default function TendersListItem({ item, index, redirectOnClick = true }: IProps) {
    const Translation = useTranslation();
    let navigate = useNavigate();
    let time = item.Time?date.format(new Date(item.Time), 'HH:mm:ss'):null;
    let statusColumnsClass = Styles[item.Statuses];
    

    let lastColumn = <Grid md={3} item>
                        <Button className={statusColumnsClass} variant="contained">{Translation(`Tender.${item.Statuses}`)}</Button>
                    </Grid>;

    if(item.Statuses == "Going"){
        lastColumn = <React.Fragment>
                        <Grid md={1} item>
                            <Button variant="contained">{time}</Button>
                        </Grid>
                        <Grid md={2} item>
                            <Button className={statusColumnsClass} variant="contained">{Translation(`Tender.${item.Statuses}`)}</Button>
                        </Grid>
                    </React.Fragment>
    }
   
    return (
        <div onClick={
            (e) => {
                if (redirectOnClick)
                    navigate(`/Tender/${item.Id}`);
            }
        }>

            <Grid container className={Styles.BoxMain} key={index} sx={{ p: 2, border: '1px solid grey' }}>
                <Grid item container className={Styles.BoxHead + ` Active`}  direction="row-reverse" justifyContent="flex-end">
                    <Grid md={7} item className={Styles.headText}>{item.Name}</Grid>
                    <Grid md={2} item>{Translation('Tender.NUMBER')}: {item.TenderNumber}</Grid>
                    {lastColumn}
                </Grid>
            
                {/* {(() => {
                    switch (item.Statuses) {
                        case 'Going':
                            return (
                                <><Box className={Styles.BoxHead + ` Active`}><Box><Button variant="contained">{time}</Button></Box><Box><Button variant="contained">פעיל</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'NotYetStarted':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.NotYetStarted}`}>
                                    <Box></Box>
                                <Box>
                                    <Button 
                                        style={{backgroundColor: "#FCC100", width: "116px", color: "#000000"}}
                                        variant="contained">טרם החל</Button>
                                    </Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'Ended':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.Ended}`}>
                                    <Box></Box><Box><Button color="error" style={{
                                        backgroundColor: "#000000", width: "140px"
                                    }}
                                        variant="contained">המכרז הסתיים</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'Paused':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.Paused}`}><Box></Box><Box><Button variant="contained" style={{
                                    backgroundColor: "#E3E6F0", width: "140px", color: "#44454B"
                                }}>המכרז בהקפאה</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        default:
                            return (
                                " "
                            )
                    }
                })()} */}

                <Box className={Styles.line}></Box> 
                {
                    (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (
                        <>
                            <Grid justifyContent="flex-end" direction="row" container alignItems="center" style={{ textAlign: "right" }}>
                                <Grid justifyContent="flex-end" direction="row" container item>{Translation('Tender.OPENING_TIME')}</Grid>
                                <Grid justifyContent="flex-end" direction="row" container item className={Styles.bold}><Moment format="hh:mm:ss" interval={30000}>{item.Time}</Moment></Grid>
                                <Grid justifyContent="flex-end" direction="row" container item>יחל בעוד 3 שעות ו-44 דקות</Grid>
                            </Grid>
                            <Box className={Styles.line}></Box>
                        </>
                    ) : (<><Box style={{ height: "40%", clear: "both" }}><span></span></Box></>)
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

        </div>
    )
}


