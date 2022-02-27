import React, { useEffect } from "react";
import "./App.css";
import TenderRoutes from "./route";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectUser} from "./Global/UsersSlice";

import Header from './Header';

export default function App() {

const userDto = useSelector(selectUser);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchUserAsync());
}, [dispatch]);

  return (
    <>

    <div className="App">
      <Header Item={userDto}  /> 
      <TenderRoutes />
    </div>
    </>
  );
}


