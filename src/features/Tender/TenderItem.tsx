import React from "react";
import TenderDto from './Dtos/TenderDto';
import LpauDto from './Dtos/LpauDto';
import Box from '@mui/material/Box';
import date from 'date-and-time';
import Button from '@mui/material/Button';
import Styles from './Tender.module.scss'
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import CurrencyFormat from 'react-number-format';
import { useTranslation } from "react-multi-lang";

interface IProps {
    item: TenderDto, 
    index: number, 
    redirectOnClick: boolean, 
    leadItem: LpauDto,
}

export default function TenderItem({ item, index, redirectOnClick = true, leadItem }: IProps) {

    let navigate = useNavigate();
    const Translation = useTranslation();
    let time = leadItem.Time?date.format(new Date(leadItem.Time), 'HH:mm:ss'):null;
    let status = leadItem.StatusId?leadItem.StatusId:item.Statuses;
    return (
        <div onClick={
            (e) => {
                if (redirectOnClick)
                    navigate(`/Tender/${item.Id}`);
            }
        }>
            <Box className={Styles.BoxMain} key={index} sx={{ p: 2, border: '1px solid grey' }}>
                {(() => {

                    switch (status) {
                        case 'Going':
                            return (
                                <><Box className={Styles.BoxHead + ` Active`}><Box>
                                    <Button variant="contained">{time}</Button>&nbsp;&nbsp;<Button variant="contained">{Translation('Tender.ACTIVE')}</Button></Box><Box style={{ width: "14%" }}>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'NotYetStarted':
                            return (
                                <><Box className={`${Styles.BoxHead}`}><Box></Box><Box><Button style={{
                                    backgroundColor: "#FCC100", width: "116px", color: "#000000"
                                }} variant="contained">{Translation('Tender.NOT_YET_STARTED')}</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'Ended':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.Ended}`}>
                                    <Box></Box><Box><Button color="error" style={{
                                        backgroundColor: "#000000", width: "140px"
                                    }}
                                        variant="contained">{Translation('Tender.TENDER_ENDED')}</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
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
                })()}

                <Box className={Styles.line}></Box>
                {
                    (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (
                        <>
                            <Box style={{ textAlign: "right" }}>
                                <Box>זמן פתיחה</Box>
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