import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"; 
import { RootState } from "../../app/store";
import DisplayMessage from './Dtos/DisplayMessage';
 
const API_URL_Tender = "./Tenders.json";

// initial state
export const initialState = {
  List: [],
  DisplayMessages: [] as DisplayMessage[],
};

export const tenderSlice = createSlice({
  name: "Tenders",
  initialState,
  reducers: {
    // getAllTender :(state,action)=>{
    //   state.List = action.payload
    // },
    setDisplayMessagesValue :(state,action)=>{
      let tender = state.DisplayMessages?.find((item:DisplayMessage)=>{
        return item.tenderId === action.payload.tenderId });
      if(tender){
        tender.display = action.payload.displayMessages;
      }
      else{
        state.DisplayMessages?.push({tenderId: action.payload.tenderId, display: action.payload.display});
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTendersAsync.fulfilled, (state, action) => {
        state.List = action.payload;
      })
    }


});

export const getAllTendersAsync  = createAsyncThunk('tenders/get', async (thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL_Tender}`);  
    return response.data;
  } catch (err) {
     return err;
  }
});

export const {
  setDisplayMessagesValue,
} = tenderSlice.actions;

export const selectTenders = (state: RootState) => state.Tenders.List;
export const selectDisplayMessages = (state:RootState) => state.Tenders.DisplayMessages;
export default tenderSlice.reducer;