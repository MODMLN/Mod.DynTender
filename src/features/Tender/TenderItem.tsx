import React from "react";
import TenderDto from './Dtos/TenderDto';
import LpauDto from './Dtos/LpauDto';

import Styles from './Tender.module.scss'
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import StatusesBtn from './../component/statusesBtn';
import { useTranslation } from "react-multi-lang";
import { Grid ,Box} from "@mui/material";

interface IProps {
    item: TenderDto, 
    index: number, 
    redirectOnClick: boolean, 
    leadItem: LpauDto,
}

export default function TenderItem({ item, index, redirectOnClick = true, leadItem }: IProps) {
    
    const Translation = useTranslation();
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
                                <Grid item className={Styles.bold}><Moment format="hh:mm:ss" interval={30000}>{item.Time}</Moment></Grid>
                                <Grid item>יחל בעוד 3 שעות ו-44 דקות</Grid>
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