import React from "react";
import TenderDto from './../Tender/Dtos/TenderDto'
import LpauDto from './../Tender/Dtos/LpauDto';
import Styles from './../Tender/Tender.module.scss'
import Button from '@mui/material/Button';
import { useTranslation } from "react-multi-lang";
import date from 'date-and-time';
import { Grid, Box } from "@mui/material";

interface IProps {
    item: TenderDto
    leadItem: LpauDto,
}

export default function StatusesBtn({ item, leadItem }: IProps) {

    const Translation = useTranslation();
    let time = leadItem.Time ? date.format(new Date(leadItem.Time), 'HH:mm:ss') : null;
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
                    <Grid item style={{ width: "14%" }}>
                        {Translation('Tender.NUMBER')}: {item.TenderNumber}
                </Grid>
                <Grid item className={Styles.headText}>{item.Name}</Grid>
            </Grid>
            
        </>
    )
}