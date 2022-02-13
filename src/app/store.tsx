import { configureStore } from "@reduxjs/toolkit";
import tendersSlice from "../features/Tenders/TendersSlice";
import tenderSlice from "../features/Tender/TenderSlice";
import LpauSlice from '../features/Tender/LpauSlice';

const store =configureStore({
  reducer: {
    data: tendersSlice,
    tenderdata:tenderSlice,
    lpaudata:LpauSlice
  }
});


export default store