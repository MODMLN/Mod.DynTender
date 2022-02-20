import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TenderItem from './TenderItem';
import { selectTender, fetchTenderAsync, selectTotalSummery } from "./TenderSlice";

import TenderLine from './TenderLine';
import TenderLineDto from './Dtos/TenderLineDto';
import { Box } from "@mui/material";
//import { useParams } from "react-router-dom";
import Styles from './Tender.module.scss';
import Dialog from './dialog';
import Button from '@mui/material/Button';
import switchStatus from './Commons/switchStatus';
import { useTranslation } from "react-multi-lang";
import { RootState } from "../../app/store";
import CurrencyFormat from 'react-number-format';

export default function Tender() {

  //const params = useParams() as any;
  const tenderDto = useSelector(selectTender);
  const TotalSummery = useSelector(selectTotalSummery);


  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const Translation = useTranslation();

  useEffect(() => {
    setOpen(true);
    dispatch(fetchTenderAsync());

    const interval = setInterval(() => {
      // dispatch(setTotalSummery(11));
    }, 10000);
    return () => clearInterval(interval);

  }, [dispatch]);

  let Statuses = switchStatus(tenderDto.Statuses);

  return (

    <Box className={Styles.BoxContainer}>
      <Box className={Styles.BoxHeadTop} >

        <Box key="1" className={Styles.tenderDetails}>
          {(tenderDto != null && tenderDto.Messages != null && tenderDto.Messages.length > 0) &&
            <Dialog key="2" flag={open} Messages={tenderDto.Messages} ></Dialog>
          }
          {(tenderDto != null) &&
            <TenderItem key="3" item={tenderDto} index={0} redirectOnClick={false} />
          }
        </Box>

      </Box>
      <Box className={Styles.BoxSumItems}>{Translation('Tender.ITEMS_IN_TENDER') + " " + tenderDto.itemsNumber} </Box>
      <Box className={Styles.TenderLines}>
        {

          (tenderDto != null && tenderDto.Lines != null && tenderDto.Lines.length > 0) ?
            tenderDto.Lines.map((itemx: TenderLineDto, indexx: number) => {

              return (
                <>
                  <TenderLine key={`indxx_${indexx}`} item={itemx} AmountSign={tenderDto.AmountSign}></TenderLine>
                </>
              )
            })
            : ''}
      </Box>
      <Box className={Styles.BoxContainer}>
        <Box className={Styles.BoxSummery}>
          <Box className={Styles.title}>סכום הצעתך</Box>
          <Box className={Styles.summery}><CurrencyFormat value={TotalSummery} displayType={'text'} thousandSeparator={true} prefix={tenderDto.CurrencyId} decimalScale={2} /></Box>
          <Box className={Styles.buttonDiv}>
            {Statuses.isVisible() &&
              <Box><Button sx={{ 'background-color': '#00798C', 'width': '50%' }} className={Styles.Button} disabled={!Statuses.isEnable()} variant="contained">הגשת ההצעה</Button></Box>
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

