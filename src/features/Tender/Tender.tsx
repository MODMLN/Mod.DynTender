import React, { useEffect, useMemo } from "react";
import { useParams ,useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TenderItem from './TenderItem';
import { selectTender, fetchTenderAsync, selectTotalSummery ,selectLpau,fetchLpauAsync, fetchConfirmPropositionAsync} from "./TenderSlice";
import TenderLine from './TenderLine';
import {TenderLineDto} from './Dtos/TenderLineDto';
import { Box, Grid } from "@mui/material";
import Styles from './Tender.module.scss';
import Dialog from './dialog';
import NeedApprovalMessages from './NeedApprovalMessages';
import Button from '@mui/material/Button';
import switchStatus from './Commons/switchStatus';
import { useTranslation } from "react-multi-lang";
import CurrencyFormat from 'react-number-format';
import UsersDto from "./../../Global/UsersDto";
import {fetchUserAsync, selectUser} from "./../../Global/UsersSlice";
import { useLiveQuery } from "dexie-react-hooks";
import {db} from './../../Global/db';
import { selectTenders, selectDisplayMessages } from "../Tenders/TendersSlice";
import logicHelper from "../../Helpers/LogicHelper"




export default function Tender() {


  const friends = useLiveQuery(
    () => db.tenderMesseges.toArray()
  );


  const { id } = useParams();
  let navigate = useNavigate();

  const tenderDisplayMessages = useSelector(selectDisplayMessages);
  const userDto = useSelector(selectUser);
  const tenderDto = useSelector(selectTender);
  const TotalSummery = useSelector(selectTotalSummery);
  const LpauDto = useSelector(selectLpau);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openBidConfirm, setOpenBidConfirm] = React.useState(false);
  const Translation = useTranslation();

  
  useEffect(() => {
    setOpen(true);
    dispatch(fetchTenderAsync());
    dispatch(fetchLpauAsync());
    dispatch(fetchUserAsync());
  
    const interval = setInterval(() => {
      dispatch(fetchLpauAsync()); 
    }, 10000);
  
    
  
  }, [dispatch]);

  const navBack = () =>{
    navigate(`/BidConfirm/${id}`);
  }

  let Statuses = switchStatus(tenderDto.Statuses);
  const displayMessages = logicHelper.isDisplayMessages(tenderDisplayMessages, tenderDto.tenderId);
 
  return (
    <Box className={Styles.BoxContainer}>
      <Grid className={Styles.BoxHeadTop} >
        <Grid key="1" className={Styles.tenderDetails}>
   
          {(tenderDto != null && tenderDto.Messages != null && tenderDto.Messages.length > 0 && displayMessages) &&
            <Dialog key="messagesDialog" flag={open} Messages={tenderDto.Messages} userDto={userDto} ></Dialog>
          }
          
          {(LpauDto != null && LpauDto.NeedApprovalMessages != null && LpauDto.NeedApprovalMessages.length > 0) &&
            <NeedApprovalMessages key="3" flag={open} Messages={LpauDto.NeedApprovalMessages}  ></NeedApprovalMessages>
          }


          {(tenderDto != null) &&
            <TenderItem key="4" item={tenderDto} index={0} redirectOnClick={false} leadItem={LpauDto} />
          }
        </Grid>

      </Grid>
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
      <Grid  className={Styles.BoxContainer}>
        <Grid container className={Styles.BoxSummery}  justifyContent="center" >
          <Grid container  justifyContent="center" className={Styles.title}>{Translation('Tender.THE_AMOUNT_OF_YOUR_BID')}</Grid>
          <Grid container  justifyContent="center" className={Styles.summery}><CurrencyFormat value={TotalSummery} displayType={'text'} thousandSeparator={true} prefix={tenderDto.CurrencyId} decimalScale={2} /></Grid>
          <Grid container   justifyContent="center" className={Styles.buttonDiv}>
            {Statuses.isVisible() &&
              <Grid  item sx={{ width: '100%' }}><Button onClick={() => {dispatch(fetchConfirmPropositionAsync(
                { userId:userDto.userId,
                  tenderId:tenderDto.Id,
                  lines:[tenderDto.Lines.map((x:TenderLineDto)=> ({tenderLineId: x.TenderLineId,price:x.Price}))]
                }));
                 navBack();
                }}
                 sx={{ 'background-color': '#00798C', 'width': '50%' }} className={Styles.Button} disabled={!Statuses.isEnable()} variant="contained">הגשת ההצעה</Button></Grid>
            }
          </Grid>
        </Grid>
      </Grid >
    </Box>
  );
};