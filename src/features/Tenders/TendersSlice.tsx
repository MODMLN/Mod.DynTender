import { CurrencyPoundTwoTone } from "@mui/icons-material";
import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios"; 
import { RootState } from "../../app/store";
import MessegesDisplayDto from './Dtos/MessegesDisplayDto';
 
const API_URL_Tender = "./Tenders.json";

// initial state
export const initialState = {
  data: [],
  TenderMesseges:new MessegesDisplayDto()
};

export const tenderSlice = createSlice({
  name: "tenders",
  initialState,
  reducers: {
    getAllTender :(state,action)=>{
      state.data = action.payload
    },
    setDisplayMessagesValue :(state,action)=>{
      let tender = state.TenderMesseges.DisplayMessages?.find((item)=>{
        return item.tenderId == action.payload.tenderId });
      if(tender){
        tender.display = action.payload.displayMessages;
      }
      else{
        state.TenderMesseges.DisplayMessages?.push({tenderId: action.payload.tenderId, display: action.payload.displayMessages});
      }
      // state.displayMessages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTendersAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
    }


});


export const fetchTenderAsync = createAsyncThunk('tenderdata/get', async (req: any,thunkAPI:any) => {
  try {
    const response = await axios.get(`${API_URL_Tender}`);
    return response.data;
  } catch (err) {
    return err;
  }
}
);

export const getAllTendersAsync  = createAsyncThunk('tenderdata/post', async (thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL_Tender}`);  
    return response.data;
  } catch (err) {
     return err;
  }
});

export const {
  setDisplayMessagesValue,
  getAllTender,
} = tenderSlice.actions;

export const selectTenders = (state: RootState) => state.data;
export const selectDisplayMessages = (state:RootState) => state.displayTenderMessages;
export default tenderSlice.reducer;
