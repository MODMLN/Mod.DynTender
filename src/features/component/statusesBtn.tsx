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
            <Box className={`${Styles.BoxHead} ${Styles.status}`}><Box>
                <Button variant="contained">{time}</Button>&nbsp;&nbsp;
                <Button variant="contained">
                    {Translation('Tender.' + status + '')}
                </Button></Box><Box style={{ width: "14%" }}>
                    מס׳: {item.TenderNumber}
                </Box><Box className={Styles.headText}>{item.Name}</Box>
            </Box> 
        </>
    )
}