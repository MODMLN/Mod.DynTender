import React, { useEffect } from "react";
import TendersDto from './Dtos/TendersDto';
import { useSelector, useDispatch } from "react-redux";
import { selectTenders, getAllTendersAsync } from "./TendersSlice";
import TendersListItem from './TendersListItem';
import TendersListItemMessage from './TendersListItemMessage';
import { Grid } from "@mui/material";
import Styles from './Tenders.module.scss';

export default function TendersList() {

  const dispatch = useDispatch();
  const tenders = useSelector(selectTenders);


  useEffect(() => {
    dispatch(getAllTendersAsync());
    const interval = setInterval(() => {
      dispatch(getAllTendersAsync());
    }, 15000);
    return () => clearInterval(interval);

  }, [dispatch]);
  return (
    <React.Fragment>

      <Grid container justifyContent="center" className={Styles.TendersList}>
        {tenders.map((item: TendersDto, index: number) => {
          return (
            <Grid container item>
              <TendersListItem key={index} item={item} index={index} redirectOnClick={true} />
             
              {((!item.HasUsersWithFemaleOwner) || (item.IsFemaleOwner)) && <TendersListItemMessage key={index} item={item}   />}
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  );
}
