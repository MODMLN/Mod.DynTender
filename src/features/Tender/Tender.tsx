import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TenderItem from './TenderItem';
import TenderWithBenfitLine from './TenderWithBenfitLine';
import { selectTender, fetchTenderAsync, selectLastPropositions, fetchLastPropositionsAsync, selectBidConfirmStatus } from "./TenderSlice";
import { Box, Grid } from "@mui/material";
import Styles from './Tender.module.scss';
import MessagesDialog from './dialog';
import NeedApprovalMessages from './NeedApprovalMessages';
import { selectUser } from "./../../Global/UsersSlice";
import { selectDisplayMessages } from "../Tenders/TendersSlice";
import logicHelper from "../../Helpers/LogicHelper";
import BidConfirm from './../TenderBidConfirm/BidConfirm';
import TenderLines from './TenderLines';
import { TenderLineDto } from "./Dtos/TenderLineDto";



export default function Tender() {
  const { id } = useParams();
  const tenderDisplayMessages = useSelector(selectDisplayMessages);
  const BidConfirmStatus = useSelector(selectBidConfirmStatus);
  const userDto = useSelector(selectUser);
  const tenderDto = useSelector(selectTender);
  const LastPropositionsDto = useSelector(selectLastPropositions)
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
    dispatch(fetchTenderAsync());
    dispatch(fetchLastPropositionsAsync());
    setInterval(() => {
      dispatch(fetchLastPropositionsAsync());
    }, 10000);
  }, [dispatch]);

  const displayMessages = logicHelper.isDisplayMessages(tenderDisplayMessages, tenderDto.Id);
  
  return (
    <Box className={Styles.BoxContainer}>
      <Grid className={Styles.BoxHeadTop} >
        <Grid key="1" className={Styles.tenderDetails}>
          {(tenderDto != null && tenderDto.Messages != null && tenderDto.Messages.length > 0 && displayMessages) &&
            <MessagesDialog key="messagesDialog" flag={displayMessages?open:false} Messages={tenderDto.Messages} userDto={userDto} ></MessagesDialog>
          }
          {(LastPropositionsDto != null && LastPropositionsDto.NeedApprovalMessages != null && LastPropositionsDto.NeedApprovalMessages.length > 0) &&
            <NeedApprovalMessages key="3" flag={open} Messages={LastPropositionsDto.NeedApprovalMessages}  ></NeedApprovalMessages>
          }
          {(tenderDto != null) &&
            <TenderItem key="4" item={tenderDto} index={0} redirectOnClick={false} leadItem={LastPropositionsDto} />
          }
        </Grid>
      </Grid>
      {tenderDto.IsTenderWithBenefits &&
      (tenderDto != null && tenderDto.Lines != null && tenderDto.Lines.length > 0) ?
          tenderDto.Lines.slice(0, 1).map((itemx: TenderLineDto, indexx: number) => {
              return (<TenderWithBenfitLine item={tenderDto} itemx={itemx}></TenderWithBenfitLine>)
            
            })
            : ''}



                      

      {((BidConfirmStatus) && (!tenderDto.IsTenderWithBenefits)) && <TenderLines key="5" item={tenderDto}></TenderLines>}
      {!BidConfirmStatus && <Box><BidConfirm></BidConfirm></Box>}
      
    </Box>
  );
};