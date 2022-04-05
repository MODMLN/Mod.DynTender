import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TenderItem from './TenderItem';
import { selectTender, fetchTenderAsync, selectTotalSummery, selectLastPropositions, fetchLastPropositionsAsync, fetchConfirmPropositionAsync, selectBidConfirmStatus } from "./TenderSlice";
import TenderLine from './TenderLine';
import { TenderLineDto } from './Dtos/TenderLineDto';
import { Box, Grid } from "@mui/material";
import Styles from './Tender.module.scss';
import MessagesDialog from './dialog';
import NeedApprovalMessages from './NeedApprovalMessages';
import Button from '@mui/material/Button';
import switchStatus from './Commons/switchStatus';
import { useTranslation } from "react-multi-lang";
import CurrencyFormat from 'react-number-format';
import { selectUser } from "./../../Global/UsersSlice";
import { selectDisplayMessages } from "../Tenders/TendersSlice";
import logicHelper from "../../Helpers/LogicHelper";
import BidConfirm from './../TenderBidConfirm/BidConfirm';

export default function Tender() {

  const { id } = useParams();
  let navigate = useNavigate();

  const tenderDisplayMessages = useSelector(selectDisplayMessages);
  const BidConfirmStatus = useSelector(selectBidConfirmStatus);
  const userDto = useSelector(selectUser);
  const tenderDto = useSelector(selectTender);
  const TotalSummery = useSelector(selectTotalSummery);
  const LastPropositionsDto = useSelector(selectLastPropositions);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const Translation = useTranslation();

  useEffect(() => {
    setOpen(true);
    dispatch(fetchTenderAsync());
    dispatch(fetchLastPropositionsAsync());
    setInterval(() => {
      dispatch(fetchLastPropositionsAsync());
    }, 10000);
  }, [dispatch]);

  const navBack = () => {
    navigate(`/Tenders`);
  }

  const statusDisplay = {
    true: 'block',
    false: 'none',
  } as const;

  let Statuses = switchStatus(tenderDto.Statuses);
  const displayMessages = logicHelper.isDisplayMessages(tenderDisplayMessages, tenderDto.Id);

  return (
    <Box className={Styles.BoxContainer}>
      <Grid className={Styles.BoxHeadTop} >
        <Grid key="1" className={Styles.tenderDetails}>

          {(tenderDto != null && tenderDto.Messages != null && tenderDto.Messages.length > 0 && displayMessages) &&
            <MessagesDialog key="messagesDialog" flag={open} Messages={tenderDto.Messages} userDto={userDto} ></MessagesDialog>
          }
          {(LastPropositionsDto != null && LastPropositionsDto.NeedApprovalMessages != null && LastPropositionsDto.NeedApprovalMessages.length > 0) &&
            <NeedApprovalMessages key="3" flag={open} Messages={LastPropositionsDto.NeedApprovalMessages}  ></NeedApprovalMessages>
          }
          {(tenderDto != null) &&
            <TenderItem key="4" item={tenderDto} index={0} redirectOnClick={false} leadItem={LastPropositionsDto} />
          }
        </Grid>
      </Grid>
      {BidConfirmStatus &&
        <Box>
          <Box className={Styles.BoxSumLink}>
            <Button size="medium" variant="contained" onClick={()=>navBack()}>{Translation('Tender.ALL_TENDERS_LIST')}</Button>
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
                  <Grid item sx={{ width: '100%' }}><Button onClick={() => {
                    dispatch(fetchConfirmPropositionAsync(
                      {
                        userId: userDto.userId,
                        tenderId: tenderDto.Id,
                        lines: [tenderDto.Lines?.map((x: TenderLineDto) => ({ tenderLineId: x.TenderLineId, price: x.Price }))]
                      }));
                  }}
                    sx={{ 'background-color': '#00798C', 'width': '50%' }} className={Styles.Button} disabled={!Statuses.isEnable()} variant="contained">הגשת ההצעה</Button></Grid>
                }
              </Grid>
            </Grid>
          </Grid >
        </Box>
      }
      {!BidConfirmStatus &&
        <Box>
          <BidConfirm></BidConfirm>
        </Box>
      }
    </Box>
  );
};