import React from "react";
import { useTranslation } from "react-multi-lang";
import {DateTime, Duration} from "luxon";

interface IProps {
    item?: number, 
}

export default function TenderStartTime({item}:IProps){

    const Translation = useTranslation();
    let dt:Duration = DateTime.now().plus({ seconds: item}).diff(DateTime.now(),['days', 'hours','minutes', 'seconds',]);
    let days = Math.round(dt.days)>0?`${Math.round(dt.days)}  ${Translation(`Tender.DAYS`)} `:'';
    let hours = Math.round(dt.hours)>0?`${Math.round(dt.hours)} ${Translation(`Tender.HOURS`)} `:'';
    let minutes = Math.round(dt.minutes)>0?`${Math.round(dt.minutes)}  ${Translation(`Tender.MINUTES`)} `:'';
    let seconds = Math.round(dt.seconds)>0?`${Math.round(dt.seconds)}  ${Translation(`Tender.SECONDS`)} `:'';

    return(
        <>
            {`${Translation('Tender.WILL_BEGIN_IN')} ${days} ${hours} ${minutes} ${seconds}`}
        </>
    )
}