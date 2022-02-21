import { createSlice, createAsyncThunk, PayloadAction,current  } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import TenderDto from './Dtos/TenderDto';
import TenderLineDto from './Dtos/TenderLineDto';


const API_URL_Tender = "/Tender.json";

export interface CounterState {
  loading: Boolean
  error: Boolean
  tenderdata: TenderDto
  totalSummery: number | undefined
  //tenderGeneralDat: TenderGeneralData
}
// initial state
export const initialState: CounterState = {
  loading: false,
  error: false,
  tenderdata: new TenderDto(),
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
            line.Price = line.Price - line.PriceStep;
            break;
          case "stepUp":
            line.Price = line.Price + line.PriceStep;
            break;
          case "priceChanged":
           if(action.payload.val.value){
            line.Price = action.payload.val.value;
           }
            break;
        }
        line.TotalPrice = CalculateLineTotal(state.tenderdata, line);
        line.TotalPriceForDisplay = line.TotalPrice;

      }
      state.totalSummery = CalculateTenderTotal(state.tenderdata)
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
const CalculateLineTotal = (tender : TenderDto, tenderLine: TenderLineDto) => {
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
export default tenderSlice.reducer;
