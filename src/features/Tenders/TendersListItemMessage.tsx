import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import TendersDto from './Dtos/TendersDto';
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Styles from './Tenders.module.scss';
import { green, orange } from "@mui/material/colors";

interface IProps {
    item: TendersDto
}

export default function TendersListItemMessage({ item }: IProps) {
  const dispatch = useDispatch();
  const Translation = useTranslation();
  useEffect(() => {
   
  }, [dispatch]);

  return (
    <React.Fragment>

      <Grid container justifyContent="center" className={Styles.TendersListItemMessage} >
            <Grid container item  className={Styles.DisplayMessage} wrap="nowrap">
              <Grid  item className={Styles.WarningAmberIcon}><WarningAmberIcon sx={{ color: orange[500] }}  /></Grid>
              <Grid className={Styles.MESSEGE}  item xs={11}> 
              {((!item.HasUsersWithFemaleOwner) && (!item.IsFemaleOwner)) && Translation('Tender.WOMAN_PREFER_MESSEGE_SUPPLIER')}
              {(item.IsFemaleOwner) && Translation('Tender.WOMAN_PREFER_MESSEGE_ISFEMALEOWNER')}
              </Grid>
                    
            </Grid>
      </Grid>
    </React.Fragment>
  );
}
