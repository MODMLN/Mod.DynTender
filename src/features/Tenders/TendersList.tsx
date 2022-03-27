import React, { useEffect } from "react";
import TendersDto from './Dtos/TendersDto';
import { useSelector, useDispatch } from "react-redux";
import { selectTenders, getAllTendersAsync } from "./TendersSlice";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TendersListItem from './TendersListItem';

export default function TendersList() {

  const dispatch = useDispatch();
  const getAllTenders = useSelector(selectTenders);


  useEffect(() => {
    dispatch(getAllTendersAsync());
    const interval = setInterval(() => {
      dispatch(getAllTendersAsync());
    }, 15000);
    return () => clearInterval(interval);

  }, [dispatch]);
console.log(getAllTenders)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        {getAllTenders.data.map((item: TendersDto, index: number) => {
          return (
            <TendersListItem key={index} item={item} index={index} redirectOnClick={true} />
          )
        })}
      </Container>
    </React.Fragment>
  );
}
