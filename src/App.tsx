import React, { useEffect } from "react";
import "./App.css";
import TenderRoutes from "./route";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectUser} from "./Global/UsersSlice";
import Header from './Header';
import { selectLastPropositions,selectTender,fetchTenderAsync } from "./features/Tender/TenderSlice";



export default function App() {

const userDto = useSelector(selectUser);
const tenderDto = useSelector(selectTender);
const LastPropositionsDto = useSelector(selectLastPropositions);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchUserAsync());
  dispatch(fetchTenderAsync());
}, [dispatch]);

  return (
    <>

    <div className="App">
      <Header User={userDto} LastPropositionsDto={LastPropositionsDto} TenderName={tenderDto.Name}  /> 
      <TenderRoutes  />
    </div>
    </>
  );
}


