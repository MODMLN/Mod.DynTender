import React, { useEffect } from "react";
import "./App.css";
import TenderRoutes from "./route";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectUser} from "./Global/UsersSlice";
import Header from './Header';
import { selectLastPropositions,selectTender,fetchTenderAsync, fetchLastPropositionsAsync } from "./features/Tender/TenderSlice";
import { BrowserRouter } from 'react-router-dom';


export default function App() {

const userDto = useSelector(selectUser);
const tenderDto = useSelector(selectTender);
const LastPropositionsDto = useSelector(selectLastPropositions);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchLastPropositionsAsync());

  dispatch(fetchUserAsync());
  dispatch(fetchTenderAsync());
}, [dispatch]);

  return (
    <>

    <div className="App">
      <BrowserRouter>
        <Header User={userDto} LastPropositionsDto={LastPropositionsDto} TenderName={tenderDto.Name}  /> 
      </BrowserRouter>
      <TenderRoutes  />
    </div>
    </>
  );
}


