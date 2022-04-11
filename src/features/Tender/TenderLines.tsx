import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Button } from "@mui/material";
import Styles from './Tender.module.scss';
import { useTranslation } from "react-multi-lang";
import CurrencyFormat from 'react-number-format';
import TenderLine from './TenderLine';
import switchStatus from './Commons/switchStatus';
import TenderDto from './Dtos/TenderDto';
import { TenderLineDto } from './Dtos/TenderLineDto';
import { fetchConfirmPropositionAsync, selectTender, selectTotalSummery } from "./TenderSlice";
import { selectUser } from "../../Global/UsersSlice";

interface IProps {
    item: TenderDto
}

export default function TenderLines({ item }: IProps): JSX.Element {
    const navigate = useNavigate();
    const tenderDto = useSelector(selectTender);
    const TotalSummery = useSelector(selectTotalSummery);
    const Translation = useTranslation();
    const dispatch = useDispatch();
    const userDto = useSelector(selectUser);
    const Statuses = switchStatus(tenderDto.Statuses);

    const navBack = () => {
        navigate(`/Tenders`);
    }

    return (
        <Box>
            <Box className={Styles.BoxSumLink}>
                <Button size="medium" variant="contained" onClick={() => navBack()}>{Translation('Tender.ALL_TENDERS_LIST')}</Button>
            </Box>
            <Box className={Styles.BoxSumItems}>{Translation('Tender.ITEMS_IN_TENDER') + " " + tenderDto.itemsNumber} </Box>
            <Box className={Styles.TenderLines}>
                {
                    (tenderDto != null && tenderDto.Lines != null && tenderDto.Lines.length > 0) ?
                        tenderDto.Lines.map((itemx: TenderLineDto, indexx: number) => {
                            return (
                                <>
                                    <TenderLine key={`indxx_${indexx}`} item={itemx} AmountSign={tenderDto.AmountSign} status={tenderDto.Statuses}></TenderLine>
                                </>
                            )
                        })
                        : ''}
            </Box>
            <Grid className={Styles.BoxContainer}>
                <Grid container className={Styles.BoxSummery} justifyContent="center" >
                    <Grid container justifyContent="center" className={Styles.title}>{Translation('Tender.THE_AMOUNT_OF_YOUR_BID')}</Grid>
                    <Grid container justifyContent="center" className={Styles.summery}><CurrencyFormat value={TotalSummery} displayType={'text'} thousandSeparator={true} prefix={tenderDto.CurrencyId} decimalScale={2} /></Grid>
                    <Grid container justifyContent="center" className={Styles.buttonDiv}>
                        {Statuses.isVisible() &&
                            <Grid item sx={{ width: '100%' }}>
                                <Button onClick={() => {
                                dispatch(fetchConfirmPropositionAsync(
                                    {
                                        userId: userDto.userId,
                                        tenderId: tenderDto.Id,
                                        lines: [tenderDto.Lines?.map((x: TenderLineDto) => ({ tenderLineId: x.TenderLineId, price: x.Price }))]
                                    }));
                            }}
                             className={Styles.Button} disabled={!Statuses.isEnable()} variant="contained">{Translation('Tender.BID_SUBMISSION')}</Button></Grid>
                        }
                    </Grid>
                </Grid>
            </Grid >
        </Box>
    )
}