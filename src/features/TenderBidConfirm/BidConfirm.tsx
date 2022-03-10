import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from './BidConfirm.module.scss';
import { Box,Button } from "@mui/material";
import { useTranslation } from "react-multi-lang";
import UsersDto from "./../../Global/UsersDto";
import { selectTender, fetchTenderAsync, selectTotalSummery ,selectLpau,fetchLpauAsync, fetchConfirmPropositionAsync} from "./../Tender/TenderSlice";
import {selectUser} from "./../../Global/UsersSlice";
import TenderItem from './../Tender/TenderItem';
import { DataGrid } from '@mui/x-data-grid';

interface IProps {
    Item: UsersDto, 
  }

export default function BidConfirm() {
    const Translation = useTranslation();
    const dispatch = useDispatch();
    const tenderDto = useSelector(selectTender);
    const LpauDto = useSelector(selectLpau);

    return (
        <>
        <Box className={Styles.BoxContainer}>
            <Box className={Styles.BoxHeadTop} >
                {(tenderDto != null) &&
                    <TenderItem key="4" item={tenderDto} index={0} redirectOnClick={false} leadItem={LpauDto} />
                }

            </Box>
        
      </Box>
        </>


    )


}


