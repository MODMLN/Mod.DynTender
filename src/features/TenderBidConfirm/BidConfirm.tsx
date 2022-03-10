import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from './BidConfirm.module.scss';
import { Box, Button,Alert  ,Stack} from "@mui/material";
import { useTranslation } from "react-multi-lang";
import UsersDto from "./../../Global/UsersDto";
import { selectTender, fetchTenderAsync, selectTotalSummery, selectLpau, fetchLpauAsync, fetchConfirmPropositionAsync } from "./../Tender/TenderSlice";
import { selectUser } from "./../../Global/UsersSlice";
import TenderItem from './../Tender/TenderItem';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface IProps {
    Item: UsersDto,
}

export default function BidConfirm() {
    const Translation = useTranslation();
    const rows: GridRowsProp = [
        { id: 1, col1: 'Hello', col2: 'World' , col3: 'World' , col4: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' , col3: 'World' , col4: 'World'},
        { id: 3, col1: 'MUI', col2: 'is Amazing' , col3: 'World' , col4: 'World'},
        { id: 3, col1: 'MUI', col2: 'is Amazing', col3: 'World' , col4: 'World' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' , col3: 'World' , col4: 'World'},
        { id: 3, col1: 'MUI', col2: 'is Amazing' , col3: 'World' , col4: 'World'},
        { id: 3, col1: 'MUI', col2: 'is Amazing', col3: 'World' , col4: 'World' },
    ];

    const columns: GridColDef[] = [
        { field: 'col1', headerName:Translation("Tender.ITEM_NAME"), width: 150, sortable:false,headerClassName:'columnHeaderTitle'},
        { field: 'col2', headerName: Translation("Tender.AMOUNT"), width: 150, sortable:false },
        { field: 'col3', headerName: Translation("Tender.PRICE"), width: 150 , sortable:false},
        { field: 'col4', headerName: '', width: 150 , sortable:false, flex: 1, cellClassName:''},
    ];

  
    const dispatch = useDispatch();
    const tenderDto = useSelector(selectTender);
    const LpauDto = useSelector(selectLpau);

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
            </Box>
        </>
    )
}


