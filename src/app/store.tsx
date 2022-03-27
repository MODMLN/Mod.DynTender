import { configureStore } from "@reduxjs/toolkit";
import tendersSlice from "../features/Tenders/TendersSlice";
import tenderSlice from "../features/Tender/TenderSlice";
import usersSlice from "../Global/UsersSlice";

const store =configureStore({
  reducer: {
    data: tendersSlice,
    TenderMesseges:tendersSlice,
    tenderdata:tenderSlice,
    userdata:usersSlice
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store