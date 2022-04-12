import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Styles from './BidConfirm.module.scss';
import { Box, Button,Alert,Stack} from "@mui/material";
import { useTranslation } from "react-multi-lang";
import UsersDto from "./../../Global/UsersDto";
import { selectTender, fetchTenderAsync, fetchLastPropositionsAsync ,selectTotalSummery,fetchConfirmPropositionAsync,bidConfirmStatus} from "./../Tender/TenderSlice";
import { DataGrid, GridColDef   } from '@mui/x-data-grid';
import CurrencyFormat from "react-number-format";
import { TenderLineDto } from "../Tender/Dtos/TenderLineDto";

interface IProps {
    Item: UsersDto,
}

export default function BidConfirm(){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const Translation = useTranslation();
    const TotalSummery = useSelector(selectTotalSummery);
    const tenderDto = useSelector(selectTender);

    useEffect(() => {
        dispatch(fetchTenderAsync());
        dispatch(fetchLastPropositionsAsync());
        dispatch(fetchConfirmPropositionAsync(''));//מסך אישור הצעה - הצגת שגיאות #31
      }, [dispatch]);
  

      let rows: readonly { [key: string]: any; }[] = [];
      if(tenderDto != null && tenderDto.Lines != null && tenderDto.Lines.length > 0 ){
          rows = tenderDto.Lines.map((x:TenderLineDto)=> ({id: x.TenderLineId, col1: x.TenderLineName, col2: x.RequiredAmount , col3: x.TotalPrice , col4: x.isUpdated?'עודכן':''}));
      }

    const columns: GridColDef[] = [
        { field: 'col1', headerName:Translation("Tender.ITEM_NAME"), width: 250, sortable:false,headerClassName:'columnHeaderTitle',renderCell: (params) => (
            <span  className={Styles.bold}>{params.value}</span>
          ),hideSortIcons:true},
        { field: 'col2', headerName: Translation("Tender.AMOUNT"),  flex: 1 , sortable:false ,renderCell: (params) => (
            <span  className={Styles.bold}>{params.value}</span>
          )},
        { field: 'col3', headerName: Translation("Tender.PRICE"),  flex: 1  , sortable:false,renderCell: (params) => (
            <span  className={Styles.bold}>{params.value}</span>
          )},
        { field: 'col4', headerName: '', width: 150 , sortable:false,  flex: 1 , renderCell: (params) => (
            <span  className={params.value?Styles.lblUpdate:''}>{params.value}</span>
          )},
    ];


    return (
        <>
            <Box className={Styles.BoxContainer} >
                <Box sx={{ direction: "rtl" }} className={Styles.DataGrid}>
                    <Box  className={Styles.AlertDiv}>
                        <Stack className={Styles.AlertDivStack}  spacing={2}>
                            <Alert className={Styles.AlertDivAlert}  severity="warning">{Translation("Tender.PROPOSAL_IS_FILLED_IN_PROPERLY")}</Alert>
                       </Stack> 
                    </Box>
                    <Box className={Styles.SUMMARYDiv}>{Translation("Tender.SUMMARY_OF_ITEMS")}</Box>
                    <Box className={Styles.InnerDataGrid}>
                        <DataGrid
                            sortingMode="client"
                            className={Styles.DataGridClass}
                            disableColumnMenu
                            hideFooter={true}
                            hideFooterPagination={true}
                            hideFooterSelectedRowCount={true}
                            rows={rows} 
                            columns={columns} 
                            autoHeight
                            isRowSelectable={()=>false}
                            sx={{
                                '&.MuiDataGrid-columnHeaderTitle': {
                                    'font-weight': 'bold !important',
                                  },
                                  '& .MuiDataGrid-columnSeparator': {
                                    display: 'none !important',
                                  },
                                   border: 0,
                             }} />
                    </Box>
                </Box>
                <Box className={Styles.BoxContainer}>
                    <Box className={Styles.BoxSummery}>
                    <Box className={Styles.title}>{Translation('Tender.THE_AMOUNT_OF_YOUR_BID')}</Box>
                    <Box className={Styles.summery}><CurrencyFormat value={TotalSummery} displayType={'text'} thousandSeparator={true} prefix={tenderDto.CurrencyId} decimalScale={2} /></Box>
                    <Box className={Styles.buttonDiv}>
                        <Box className={Styles.button}><Button onClick={()=>{dispatch(bidConfirmStatus(true))}}  sx={{  'color': '#00798C', 'width': '50%'}} className={Styles.Button}  variant="outlined" >{Translation('Tender.BACK')}</Button></Box>
                        <Box className={Styles.button}><Button  sx={{ 'background-color': '#00798C', 'width': '50%' }} className={Styles.Button}  variant="contained">{Translation('Tender.Offer_confirmation')}</Button></Box>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


