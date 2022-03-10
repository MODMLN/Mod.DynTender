import React from "react";
import TenderDto from './Dtos/TenderDto';
import LpauDto from './Dtos/LpauDto';
import Box from '@mui/material/Box';
import Styles from './Tender.module.scss'
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import StatusesBtn from './../component/statusesBtn';
import { useTranslation } from "react-multi-lang";

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
            <Box className={Styles.BoxMain} key={index} sx={{ p: 2 }}>
               <StatusesBtn item={item} leadItem={leadItem}></StatusesBtn>
                <Box className={Styles.line}></Box>
                {
                    (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (
                        <>
                            <Box style={{ textAlign: "right" }}>
                                <Box>{Translation('Tender.OPEN_TIME')}</Box>
                                <Box className={Styles.bold}><Moment format="hh:mm:ss" interval={30000}>{item.Time}</Moment></Box>
                                <Box>יחל בעוד 3 שעות ו-44 דקות</Box>
                            </Box>
                            <Box className={Styles.line}></Box>
                        </>
                    ) : (<><Box style={{ height: "auto", clear: "both" }}><span></span></Box></>)
                }
                <Box className={`${leadItem.IsWinning && Styles.green} ${!leadItem.IsWinning && Styles.red} ${Styles.Proposal}`} >
                    <Box className={Styles.leadPrice}>
                        <Box>{leadItem.WinningInfo}</Box>
                        <Box className={Styles.bold}><CurrencyFormat decimalScale={2} value={leadItem.UserLastPropositionTotal} displayType={'text'} thousandSeparator={true} prefix={item.CurrencyId}></CurrencyFormat></Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}