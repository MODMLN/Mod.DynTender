import { configureStore } from "@reduxjs/toolkit";
import tendersSlice from "../features/Tenders/TendersSlice";
import tenderSlice from "../features/Tender/TenderSlice";
import usersSlice from "../Global/UsersSlice";
import ScreenSizeSlice from "../services/ScreenSizeDetectorSlice";
const store =configureStore({
  reducer: {
    Tenders: tendersSlice,
    Tender: tenderSlice,
    User: usersSlice,
    ScreenSize:ScreenSizeSlice,

  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store