import React, { useEffect } from "react";
import "./App.css";
import TenderRoutes from "./route";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectUser} from "./Global/UsersSlice";
import { selectScreenSize,fetchScreenSizeAsync} from "./services/ScreenSizeDetectorSlice";

import Header from './Header';



export default function App() {

const userDto = useSelector(selectUser);
const ScreenSize = useSelector(selectScreenSize);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchScreenSizeAsync());
  
  dispatch(fetchUserAsync());
}, [dispatch]);

  return (
    <>

    <div className="App">
      <Header Item={userDto} ScreenSize={ScreenSize}  /> 
      <TenderRoutes  />
    </div>
    </>
  );
}


