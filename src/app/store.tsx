import { configureStore } from "@reduxjs/toolkit";
import tendersSlice from "../features/Tenders/TendersSlice";
import tenderSlice from "../features/Tender/TenderSlice";

const store =configureStore({
  reducer: {
    data: tendersSlice,
    tenderdata:tenderSlice
  }
});


export default store