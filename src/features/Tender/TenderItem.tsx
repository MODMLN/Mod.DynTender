import React from "react";
import TenderDto from './Dtos/TenderDto';
import LpauDto from './Dtos/LpauDto';
import {DateTime, Duration} from "luxon";
import Styles from './Tender.module.scss'
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import StatusesBtn from './../component/statusesBtn';
import { Grid ,Box} from "@mui/material";
import { useTranslation } from "react-multi-lang";

interface IProps {
    item: TenderDto, 
    index: number, 
    redirectOnClick: boolean, 
    leadItem: LpauDto,
}

export default function TenderItem({ item, index, redirectOnClick = true, leadItem }: IProps) {
    const Translation = useTranslation();
    let dt:Duration = DateTime.now().plus({ seconds: item.Time}).diff(DateTime.now(),['days', 'hours','minutes', 'seconds',]);
    let days = Math.round(dt.days)>0?`${Math.round(dt.days)}  ${Translation(`Tender.DAYS`)} `:'';
    let hours = Math.round(dt.hours)>0?`${Math.round(dt.hours)} ${Translation(`Tender.HOURS`)} `:'';
    let minutes = Math.round(dt.minutes)>0?`${Math.round(dt.minutes)}  ${Translation(`Tender.MINUTES`)} `:'';
    let seconds = Math.round(dt.seconds)>0?`${Math.round(dt.seconds)}  ${Translation(`Tender.SECONDS`)} `:'';

    let navigate = useNavigate();
    return (
        <div onClick={
            (e) => {
                if (redirectOnClick)
                    navigate(`/Tender/${item.Id}`);
            }
        }>
            <Grid  justifyContent="flex-end" container className={Styles.BoxMain} key={index} sx={{ p: 2 }}>
               <Grid item><StatusesBtn item={item} leadItem={leadItem}></StatusesBtn></Grid>
               <Box className={Styles.line}></Box>
                {
                    (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (
                        <>
                            <Grid  container style={{ textAlign: "right" }}>
                                <Grid item>{Translation('Tender.OPEN_TIME')}</Grid>
                                <Grid item className={Styles.bold}><Moment format="hh:mm:ss" interval={30000}>{item.StartDate}</Moment></Grid>
                                <Grid item>{`${Translation('Tender.WILL_BEGIN_IN')} ${days} ${hours} ${minutes} ${seconds}`}</Grid>
                            </Grid>
                            <Box className={Styles.line}></Box>
                        </>
                    ) : (<><Box style={{ height: "auto", clear: "both" }}><span></span></Box></>)
                }
                <Grid direction="row-reverse" justifyContent="flex-end" container className={`${leadItem.IsWinning && Styles.green} ${!leadItem.IsWinning && Styles.red} ${Styles.Proposal}`} >
                    <Grid direction="row-reverse" justifyContent="flex-end" md={4} container className={Styles.leadPrice}>
                        <Grid container item  direction="row-reverse" justifyContent="flex-end" >{leadItem.WinningInfo}</Grid>
                        <Grid container item  direction="row-reverse" justifyContent="flex-end"  className={Styles.bold}><CurrencyFormat decimalScale={2} value={leadItem.UserLastPropositionTotal} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}