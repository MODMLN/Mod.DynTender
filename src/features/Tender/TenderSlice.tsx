import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import TenderDto from './Dtos/TenderDto';
import {TenderLineDto} from './Dtos/TenderLineDto';
import LpauDto from './Dtos/LpauDto';
import UsersDto from './../../Global/UsersDto';
const API_URL_Tender = "/Tender.json";
const API_URL_Lpau = "/LeadingPropositionAndUser.json";

export interface CounterState {
  loading: Boolean
  error: Boolean
 // globaldata:
  tenderdata: TenderDto
  lpaudata:LpauDto
  totalSummery: number | undefined
}

// initial state
export const initialState: CounterState = {
  loading: false,
  error: false,
  tenderdata: new TenderDto(),
  lpaudata:new LpauDto(),
  totalSummery: 0
};

export const tenderSlice = createSlice({
  name: "tenderdata",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    linePriceChanged: (state, action) => {
      //action contains lineId and 
      //called on change of + - and field blur
      //call line sum change
      let lines = state.tenderdata.Lines?.filter((x) => x.TenderLineId === action.payload.TenderLineId);
      let line = lines == null ? null : lines[0];

      if (line != null) {
        switch (action.payload.actionType) {
          case "stepDown":
            line.Price = Number(line.Price) - Number(line.PriceStep);
            break;
          case "stepUp":
            line.Price = Number(line.Price) + Number(line.PriceStep);
            break;
          case "priceChanged":
            if (action.payload.val.value) {
              line.Price = Number(action.payload.val.value);
            }
            break;
        }

        if(line.MinPrice < line.Price && line.Price > line.MaxPrice){
            line.ErrorMsgIsOpen = true;
            line.ErrorMsgMessege = 'המחיר שהוקלד אינו עומד בטווח שנקבע';
            
           // line.ErrorMsg.isOpen = line.ErrorMsg?line.ErrorMsg.isOpen:false;
            //line.ErrorMsg.messege = line.ErrorMsg?line.ErrorMsg.messege:"";
        }
        
        line.TotalPrice = CalculateLineTotal(state.tenderdata, line);
        line.TotalPriceForDisplay = line.TotalPrice;
      }
      state.totalSummery = CalculateTenderTotal(state.tenderdata);
    },
    setTotalSummery: (state, action: PayloadAction<number>) => {
      if (state.totalSummery)
        state.totalSummery += action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenderAsync.pending, (state, action) => {
      })
      .addCase(fetchTenderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tenderdata = SetTenderData(state, action.payload);
      })
      .addCase(fetchLpauAsync.fulfilled, (state, action) => {
        state.lpaudata = SetLpauDtoData(state, action.payload);
      })
      .addCase(fetchApproveMessagesAsync.fulfilled, (state, action) => {
       
        //console.log(state.userdata)
      })
      .addCase(fetchTenderAsync.rejected, (state, { payload }) => {
        state.loading = false;
        //state.byId[userId] = null; // <-- I need the userId from createAsyncThunk here.
      });
  },
});

export const fetchTenderAsync = createAsyncThunk('tenderdata/get', async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL_Tender}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchLpauAsync = createAsyncThunk('tenderdata/post', async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL_Lpau}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchApproveMessagesAsync = createAsyncThunk('tenderdata/ApproveMessages', async (req:any,thunkAPI: any) => {
    try {
      const response = await axios.get(`${API_URL_Lpau}/${req}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const SetTenderData = (state: CounterState, tender: TenderDto) => {
  tender.itemsNumber = tender.Lines != null ? tender.Lines.length : 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tender.IsFemaleOwner ? tender.Messages?.push('הנך זכאי להעדפה של עידוד נשים בעסקים ולכן על מנת להוביל עליך להציע הצעה זהה להצעה המובילה') : null;
  // eslint-disable-next-line array-callback-return
  tender.Lines?.map((item) => {
    item.CurrencyId = tender.CurrencyId;
    item.IsPercentageCalculation = tender.IsPercentageCalculation;
  });
  state.totalSummery = CalculateTenderTotal(tender);
  return tender;
}

const SetLpauDtoData = (state: CounterState, lpau: LpauDto) => { 
  return lpau;
}

const CalculateLineTotal = (tender: TenderDto, tenderLine: TenderLineDto) => {
   return tender.IsPercentageCalculation ?
    tenderLine.Price * tenderLine.RequiredAmount / 100 :
    tenderLine.Price * tenderLine.RequiredAmount;
}

const CalculateTenderTotal = (tender: TenderDto) => {
  return tender.Lines?.map(bill => bill.TotalPriceForDisplay).reduce((acc, bill) => bill + acc)
}

export const {
  setTotalSummery,
  startLoading,
  linePriceChanged,
} = tenderSlice.actions;

export const selectTender = (state: { tenderdata: { tenderdata: any; }; }) => state.tenderdata.tenderdata;
export const selectTotalSummery = (state: RootState) => state.tenderdata.totalSummery;
export const selectLpau = (state: RootState) => state.tenderdata.lpaudata;
export default tenderSlice.reducer;