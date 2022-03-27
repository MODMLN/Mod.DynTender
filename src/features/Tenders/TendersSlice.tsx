import { CurrencyPoundTwoTone } from "@mui/icons-material";
import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios"; 
import { RootState } from "../../app/store";
import TenderMessegesDto from './Dtos/TenderMessegesDto';
 
const API_URL_Tender = "./Tenders.json";

// initial state
export const initialState = {
  data: [],
  TenderMesseges:new TenderMessegesDto()
};

export const tenderSlice = createSlice({
  name: "tenders",
  initialState,
  reducers: {
    getAllTender :(state,action)=>{
      state.data = action.payload
    },
    setDisplayMessagesValue :(state,action)=>{
      let tender = state.TenderMesseges.Messages?.find((item)=>{
        return item.tenderId == action.payload.tenderId });
      if(tender){
        tender.display = action.payload.displayMessages;
      }
      else{
        state.TenderMesseges.Messages?.push({tenderId: action.payload.tenderId, display: action.payload.displayMessages});
      }
      // state.displayMessages;
    },
    isDisplayMessages: (state, action)=> {
      let tender = state.TenderMesseges.Messages?.find((item)=>{
        return item.tenderId == action.payload.tenderId });
      // tender? tender.display : true;
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
  isDisplayMessages,
  setDisplayMessagesValue,
  getAllTender,
} = tenderSlice.actions;

export const selectTenders = (state: RootState) => state.data;
//export const selectDisplayMessages = (state:RootState) => state.TenderMesseges;
export default tenderSlice.reducer;
