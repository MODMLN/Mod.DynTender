import React from "react";
import TendersDto from './Dtos/TendersDto';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Styles from './Tenders.module.scss'
import Moment from 'react-moment';
import {  useNavigate } from "react-router-dom";


interface IProps {
    item: TendersDto, index: number, redirectOnClick: boolean
}

export default function TenderListsItem({ item, index, redirectOnClick = true }: IProps) {
    function currencyFormat(num: number) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    let navigate = useNavigate();
   

    return (
        <div onClick={
            (e) => {
                if (redirectOnClick)
                    navigate(`/Tender/${item.Id}`);
            }
        }>

            <Box className={Styles.BoxMain} key={index} sx={{ p: 2, border: '1px solid grey' }}>
                {(() => {
                    switch (item.Statuses) {
                        case 'Active':
                            return (
                                <><Box className={Styles.BoxHead + ` Active`}><Box><Button variant="contained">00:14:32</Button></Box><Box><Button variant="contained">פעיל</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'NotStarted':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.NotStarted}`}><Box></Box><Box><Button style={{
                                    backgroundColor: "#FCC100", width: "116px", color: "#000000"
                                }} variant="contained">טרם החל</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'Ended':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.Ended}`}>
                                    <Box></Box><Box><Button color="error" style={{
                                        backgroundColor: "#000000", width: "140px"
                                    }}
                                        variant="contained">המכרז הסתיים</Button></Box><Box>מס׳: {item.TenderNumber}</Box><Box className={Styles.headText}>{item.Name}</Box></Box></>
                            )
                        case 'Frozen':
                            return (
                                <><Box className={`${Styles.BoxHead} ${Styles.Frozen}`}><Box></Box><Box><Button variant="contained" style={{
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
                    (item.Statuses === "NotStarted" || item.Statuses === "Frozen") ? (
                        <>
                            <Box style={{ textAlign: "right" }}>
                                <Box>זמן פתיחה</Box>
                                <Box className={Styles.bold}><Moment format="hh:mm:ss" interval={30000}>{item.Time}</Moment></Box>
                                <Box>יחל בעוד 3 שעות ו-44 דקות</Box>
                            </Box>
                            <Box className={Styles.line}></Box>
                        </>
                    ) : (<><Box style={{ height: "40%", clear: "both" }}><span></span></Box></>)
                }
                <Box className={Styles.Proposal} >
                    <Box className={Styles.leadPrice}>
                        <Box>מחיר מוביל</Box>
                        <Box className={Styles.bold}>{item.CurrencyId} {currencyFormat(item.TotalToLead as number)}</Box>
                    </Box>
                    <Box className={Styles.greenProposal}>
                        <Box>הצעתך מובילה</Box>
                        <Box className={Styles.bold}>₪ 18,234</Box></Box>
                </Box>
            </Box>

        </div>
    )
}


