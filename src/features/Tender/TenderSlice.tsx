import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import TenderDto from './Dtos/TenderDto';

 
const API_URL_Tender = "/Tender.json";


// initial state
export const initialState = {
  loading: false,
  error: false,
  tenderdata:new TenderDto()//TenderDto
};

export const tenderSlice = createSlice({
  name: "tenderdata",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  }, 
  extraReducers: (builder) => {
    builder   
    .addCase(fetchTenderAsync.pending, (state, action) => {
       
      
    })
    .addCase(fetchTenderAsync.fulfilled, (state, action) => {
      state.loading = false;
        state.tenderdata = SetTenderData(action.payload);
    })
    .addCase(fetchTenderAsync.rejected, (state, { payload }) => {
        state.loading = false;
        //state.byId[userId] = null; // <-- I need the userId from createAsyncThunk here.
    });
   
  },
});

export const fetchTenderAsync = createAsyncThunk('tenderdata/get', async(thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL_Tender}`);  
        return response.data;
      
      } catch (err) {
          return err;
      }
  }
);

function SetTenderData(tender){
  tender.itemsNumber = tender.Lines != null ? tender.Lines.length : 0;
  
  return tender;
}

export const {
  startLoading,
} = tenderSlice.actions;


export const selectTender = (state: { tenderdata: { tenderdata: any; }; }) => state.tenderdata.tenderdata;

export default tenderSlice.reducer;
