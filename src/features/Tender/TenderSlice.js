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
    addTender: (state, action) => {
      state = state.push({
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
      });
      // return state;
    },
    editTender: (state, action) => {
      state = state.map((tender) => {
        if (tender.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            body: action.payload.body,
          };
        } else {
          return {
            ...tender,
          };
        }
      });

      return state;
    },
    removeTender: (state, action) => {
      state = state.filter((tender) => tender.id !== action.payload.id);
      return state;
    },
    
  }, 
  extraReducers: (builder) => {
    builder   
    .addCase(fetchTenderAsync.pending, (state, action) => {
       
      
    })
    .addCase(fetchTenderAsync.fulfilled, (state, action) => {
      state.loading = false;
        state.tenderdata = action.payload;
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
          return thunkAPI.rejectWithValue(err?.response?.data);
      }
  }
);



export const {
  startLoading,
  addTender,
  editTender,
  removeTender,
} = tenderSlice.actions;


export const selectTender = (state) => state.tenderdata.tenderdata;

export default tenderSlice.reducer;
