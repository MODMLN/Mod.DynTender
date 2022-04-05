import React from "react";
import TenderDto from './Dtos/TenderDto';
import LpauDto from './Dtos/LastPropositionsDto';
import Styles from './Tender.module.scss'
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import StatusesBtn from './../component/statusesBtn';
import { Grid ,Box} from "@mui/material";
import { useTranslation } from "react-multi-lang";
import TenderStartTime from './../component/tenderStartTime';

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
               <Grid item className={Styles.StatusesBtn}><StatusesBtn item={item} leadItem={leadItem}></StatusesBtn></Grid>
               <Box className={Styles.line}></Box>
                {
                    (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (
                        <>
                            <Grid  container style={{ textAlign: "right" }}>
                                <Grid item>{Translation('Tender.OPEN_TIME')}</Grid>
                                <Grid item className={Styles.bold}><Moment format="hh:mm:ss" interval={30000}>{item.StartDate}</Moment></Grid>
                                <Grid item><TenderStartTime key={index} item={item.Time}   /></Grid>
                            </Grid>
                            <Box className={Styles.line}></Box>
                        </>
                    ) : (<><Box style={{ height: "auto", clear: "both" }}><span></span></Box></>)
                }
                <Grid container className={`${leadItem.IsWinning && Styles.green} ${!leadItem.IsWinning && Styles.red} ${Styles.Proposal}`} >
                    <Grid justifyContent="flex-end"  container className={Styles.leadPrice}>
                        <Grid justifyContent="flex-end" container>{leadItem.WinningInfo}</Grid>
                        <Grid justifyContent="flex-end" container className={Styles.bold}><CurrencyFormat decimalScale={2} value={leadItem.UserLastPropositionTotal} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}