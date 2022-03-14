import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from './BidConfirm.module.scss';
import { Box, Button,Alert  ,Stack,Link} from "@mui/material";
import { useTranslation } from "react-multi-lang";
import UsersDto from "./../../Global/UsersDto";
import { selectTender, fetchTenderAsync, selectTotalSummery, selectLpau, fetchLpauAsync, fetchConfirmPropositionAsync } from "./../Tender/TenderSlice";
import { selectUser } from "./../../Global/UsersSlice";
import TenderItem from './../Tender/TenderItem';
import { DataGrid, GridRowsProp, GridColDef ,GridRowParams  } from '@mui/x-data-grid';
import CurrencyFormat from "react-number-format";
import { Lines } from "../Tenders/Dtos/TendersDto";
import { TenderLineDto } from "../Tender/Dtos/TenderLineDto";


interface IProps {
    Item: UsersDto,
}



export default function BidConfirm(){
    const dispatch = useDispatch();
    const Translation = useTranslation();
    
    const tenderDto = useSelector(selectTender);
    const LpauDto = useSelector(selectLpau);

    useEffect(() => {
        dispatch(fetchTenderAsync());
        dispatch(fetchLpauAsync());
      }, [dispatch]);
  
     

      
       
    const rows: GridRowsProp = (tenderDto != null && tenderDto.Lines != null && tenderDto.Lines.length > 0  &&
         tenderDto.Lines.map((x:TenderLineDto)=> ({id: x.TenderLineId, col1: x.TenderLineName, col2: x.RequiredAmount , col3: x.Price , col4: 'עודכן'})));
     


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
            <span  className={Styles.lblUpdate}>{params.value}</span>
          )},
    ];

    return (
        <>
            <Box className={Styles.BoxContainer}>
                <Box className={Styles.BoxHeadTop} >
                    <Box className={Styles.tenderDetails}>
                    {(tenderDto != null) &&
                       
                        <TenderItem key="4" item={tenderDto} index={0} redirectOnClick={false} leadItem={LpauDto} />
                    }
                    </Box>
                </Box>
                <Box sx={{ direction: "rtl" }} className={Styles.DataGrid}>
                    <Box  className={Styles.AlertDiv}>
                        <Stack sx={{ width: '30%' }} spacing={2}>
                            <Alert  sx={{ backgroundColor: '#E3EBF8' }} severity="warning">{Translation("Tender.PROPOSAL_IS_FILLED_IN_PROPERLY")}</Alert>
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
                         
                            sx={{
                                '& .MuiDataGrid-columnHeaderTitle': {
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
                    <Box className={Styles.summery}><CurrencyFormat value={225254} displayType={'text'} thousandSeparator={true} prefix={tenderDto.CurrencyId} decimalScale={2} /></Box>
                    <Box className={Styles.buttonDiv}>
                        <Box className={Styles.button}><Button  sx={{  'color': '#00798C', 'width': '50%'}} className={Styles.Button}  variant="outlined">{Translation('Tender.BACK')}</Button></Box>
                        <Box className={Styles.button}><Button  sx={{ 'background-color': '#00798C', 'width': '50%' }} className={Styles.Button}  variant="contained">{Translation('Tender.Offer_confirmation')}</Button></Box>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


