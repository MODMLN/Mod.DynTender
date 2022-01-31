import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TenderListsItem from './../Tenders/TenderListsItem';
import { selectTender, getTenderAsync } from "./TenderSlice";
import TenderLine from './TenderLine';
import TenderDto from './../Tenders/TenderDto';
import { Box } from "@mui/material";
import { useParams } from "react-router-dom"; 
import Styles from './Tender.module.scss'



export default function Tender() {
const params  = useParams() as any;
const dispatch = useDispatch();
const getTender = useSelector(selectTender);


useEffect(() => {
  dispatch(getTenderAsync(params.id));
  const interval = setInterval(() => {
      dispatch(getTenderAsync(params.id));
  }, 15000);
  return () => clearInterval(interval);
  

}, [dispatch]);

    return (
      <Box  className={Styles.BoxContainer}>
        <Box className={Styles.BoxHeadTop} > 
          {getTender.data.filter((x: { Id: number; })=>x.Id===Number(params.id)).map((item: TenderDto, index: number) => {
              return (
                  <Box key={index} className={Styles.tenderDetails}>
                    <TenderListsItem key={index} item={item} index={index} redirectOnClick={false}   />
                  </Box>
                )
            })}
        </Box>
        <Box className={Styles.BoxSumItems}>18 פריטים במכרז</Box>
        <Box  className={Styles.TenderLines}>
              <TenderLine></TenderLine>
              <TenderLine></TenderLine>
              <TenderLine></TenderLine>
              <TenderLine></TenderLine>
              <TenderLine></TenderLine>
        </Box>
      </Box>
    );
  };
  
