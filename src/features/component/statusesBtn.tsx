import React from "react";
import TenderDto from './../Tender/Dtos/TenderDto'
import LpauDto from './../Tender/Dtos/LpauDto';
import Box from '@mui/material/Box';
import Styles from './../Tender/Tender.module.scss'
import Button from '@mui/material/Button';
import { useTranslation } from "react-multi-lang";
import date from 'date-and-time';

interface IProps {
    item: TenderDto
    leadItem: LpauDto,
}

export default function StatusesBtn({ item, leadItem }: IProps) {

    const Translation = useTranslation();
    let time = leadItem.Time ? date.format(new Date(leadItem.Time), 'HH:mm:ss') : null;
    let status = leadItem.StatusId?leadItem.StatusId:item.Statuses;
    
    return (
        <>
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
        </>
    )
}