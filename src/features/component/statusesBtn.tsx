import React from "react";
import TenderDto from './../Tender/Dtos/TenderDto'
import LastPropositionsDto from './../Tender/Dtos/LastPropositionsDto';
import Styles from './../Tender/Tender.module.scss'
import Button from '@mui/material/Button';
import { useTranslation } from "react-multi-lang";
import date from 'date-and-time';
import { Grid } from "@mui/material";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
interface IProps {
    item: TenderDto
    leadItem: LastPropositionsDto,
}

export default function StatusesBtn({ item, leadItem }: IProps) {

    const Translation = useTranslation();
    let time = leadItem.Time ? date.format(new Date(leadItem.Time), 'HH:mm:ss') : '00:00:00';
    let status = leadItem.StatusId ? leadItem.StatusId : item.Statuses;

    return (
        <>
            <Grid className={`${Styles.BoxHead} ${Styles.status}`}>
                     <Grid item>
                        <Button variant="contained">{time}</Button>&nbsp;&nbsp;
                        <Button variant="contained">
                            {Translation('Tender.' + status + '')}
                        </Button>
                    </Grid>
                    <Grid item className={Styles.TenderNumber} >
                        {Translation('Tender.NUMBER')}: {item.TenderNumber}
                </Grid>
                <BrowserView><Grid item className={Styles.headText}>{item.Name}</Grid></BrowserView>
            </Grid>
            
        </>
    )
}