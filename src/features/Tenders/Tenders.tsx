import React from "react";
import TendersList from "./TendersList";
import { useTranslation } from "react-multi-lang";
import { useSelector } from "react-redux";
import { selectUser } from "../../Global/UsersSlice";
import Styles from './Tenders.module.scss';
import { Box } from "@mui/material";

export default function Tenders  ()  {
  const Translation = useTranslation();
  const userDto = useSelector(selectUser);
  return (
    <Box className={Styles.TendersContainer}>
      <Box className={Styles.TendersHead}>
        <div className={Styles.userNameDiv}>{Translation('Tender.HELLO')} {userDto.userName}</div>
        <div className={Styles.AllTenders}>{Translation('Tender.ALL_TENDERS')}</div>
        </Box>

      <TendersList />
    </Box>
  );
};