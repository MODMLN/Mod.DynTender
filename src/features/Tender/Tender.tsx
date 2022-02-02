import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TenderItem from './TenderItem';
import { selectTender, getTenderAsync } from "./TenderSlice";
import TenderLine from './TenderLine';
import TenderDto  from './Dtos/TenderDto';
import TenderLineDto  from './Dtos/TenderLineDto';
import { Box } from "@mui/material";
import { useParams } from "react-router-dom"; 
import Styles from './Tender.module.scss'
import Dialog from './dialog';


export default function Tender() {
const [open, setOpen] = React.useState(false);
const params  = useParams() as any;

const dispatch = useDispatch();
const getTender = useSelector(selectTender);


useEffect(() => {
  setOpen(true);
  dispatch(getTenderAsync());
  const interval = setInterval(() => {
      dispatch(getTenderAsync());
  }, 15000);
  return () => clearInterval(interval);


}, [dispatch]);


    return (

      <Box  className={Styles.BoxContainer}>

        <Dialog flag={open} Messages={[]} ></Dialog>

        <Box className={Styles.BoxHeadTop} > 
          {getTender.data.map((item: TenderDto, index: number) => {
              
              return (
                  <Box key={index} className={Styles.tenderDetails}>
                    <TenderItem key={index} item={item} index={index} redirectOnClick={false}   />
                  </Box>
                )
             
            })}
        </Box>
        <Box className={Styles.BoxSumItems}>18 פריטים במכרז</Box>
        <Box  className={Styles.TenderLines}>
     

        {getTender.data.map((item: TenderDto, index: number) => {
          item.Lines.map((item: TenderLineDto, index: number) => {
           return (

              <TenderLine></TenderLine>
            )
          })
         })}
        </Box>
      </Box>
      
    );
  };
  
