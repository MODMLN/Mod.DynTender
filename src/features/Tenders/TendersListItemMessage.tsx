import React, { useEffect } from "react";
import TendersDto from './Dtos/TendersDto';
import { useSelector, useDispatch } from "react-redux";
import { selectTenders, getAllTendersAsync } from "./TendersSlice";
import TendersListItem from './TendersListItem';
import { Grid } from "@mui/material";
import Styles from './Tenders.module.scss';

interface IProps {
    item: TendersDto
}

export default function TendersListItemMessage({ item }: IProps) {

  const dispatch = useDispatch();
  const tenders = useSelector(selectTenders);


  useEffect(() => {
    dispatch(getAllTendersAsync());
  }, [dispatch]);

  return (
    <React.Fragment>

      <Grid container justifyContent="center" className={Styles.TendersListItemMessage} >
            <Grid container item className={Styles.DisplayMessage}>
                    במכרז זה משתתף לפחות ספק אחד הזכאי להעדפה של עידוד נשים בעסקים.
            </Grid>
      </Grid>
    </React.Fragment>
  );
}
