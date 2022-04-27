import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import TenderDto from './Dtos/TenderDto';
import { TenderLineDto } from './Dtos/TenderLineDto';
import LastPropositionsDto from './Dtos/LastPropositionsDto';

const API_URL_Tender = "/Tender.json";
const API_URL_Lpau   = "/LeadingPropositionAndUser.json";

export interface TenderMesseges {
  id?: number;
  Tanderid?: number;
  ischecked: boolean;
}

export interface CounterState {
  loading: boolean,
  error: boolean,
  BidConfirmStatus:boolean,
  Tender: TenderDto,
  LastPropositionsdata: LastPropositionsDto,
  TotalSummery: number | undefined
}

// initial state
export const initialState: CounterState = {
  loading: false,
  error: false,
  BidConfirmStatus:true,
  Tender: new TenderDto(),
  LastPropositionsdata: new LastPropositionsDto(),
  TotalSummery: 0
};

export const tenderSlice = createSlice({
  
  name: "tenderdata",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    bidConfirmStatus: (state, action) => {
      state.BidConfirmStatus = action.payload;
    },

    linePriceChanged: (state, action) => {
      
      //action contains lineId and 
      //called on change of + - and field blur
      //call line sum change
      let lines = state.Tender.Lines?.filter((x) => x.TenderLineId === action.payload.TenderLineId);
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
      
        if (line.MinPrice < line.Price && line.Price > line.MaxPrice) {
          line.ErrorMsgIsOpen = true;
          line.ErrorMsgMessege = 'המחיר שהוקלד אינו עומד בטווח שנקבע';
        }


        line.Price = parseFloat(parseFloat(String(line.Price)).toFixed(2));
        line.TotalPrice = CalculateLineTotal(state.Tender, line);
        line.TotalPriceForDisplay = line.TotalPrice;
        line.isUpdated = true;

      }
      state.TotalSummery = CalculateTenderTotal(state.Tender);
    },
    setTotalSummery: (state, action: PayloadAction<number>) => {
      if (state.TotalSummery)
        state.TotalSummery += action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenderAsync.pending, (state, action) => {
      })
      .addCase(fetchTenderAsync.fulfilled, (state, action) => {
        state.loading = false;
        // if (Tender?.Lines != null)
        state.Tender = SetTenderData(state, action.payload);
        // else{
        //   set all , but prices
        // }
      })
      .addCase(fetchLastPropositionsAsync.fulfilled, (state, action) => {
        //if(state.isEditingLine === false){
        state.LastPropositionsdata = SetLastPropositionsDtoData(state, action.payload);
        //}
      })
      .addCase(fetchApproveMessagesAsync.fulfilled, (state, action) => {

        //console.log(state.userdata)
      })
      .addCase(fetchTenderAsync.rejected, (state, { payload }) => {
        state.loading = false;
        //state.byId[userId] = null; // <-- I need the userId from createAsyncThunk here.
      })
      .addCase(fetchConfirmPropositionAsync.fulfilled, (state, action) => {
        state.BidConfirmStatus = false;
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

export const fetchLastPropositionsAsync = createAsyncThunk('tenderdata/post', async (thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL_Lpau}`);
    return response.data;
  } catch (err) {
    return err;
  }
}
);

export const fetchApproveMessagesAsync = createAsyncThunk('tenderdata/ApproveMessages', async (req: any, thunkAPI: any) => {
  try {
    const response = await axios.post(`${API_URL_Lpau}/${req}`);
    return response.data;
  } catch (err) {
    return err;
  }
}
);

export const fetchConfirmPropositionAsync = createAsyncThunk('tenderdata/ConfirmProposition', async (req: any, thunkAPI: any) => {
  const fakeErrorsResponse  = {Errors: [
    "המחיר קטן מידי",
    "המכרז הסתיים"
    ]};
  try {
    let responseFakeJson = {Price:225,TotalWithoutBenefits:28555};//need to replace with real response
    const response = await axios.post(
      `${API_URL_Lpau}/ConfirmProposition`,
      req,
    )
    return response.data;
    } catch (err) {
      return err;
    }
  }
);

const SetTenderData = (state: CounterState, tender: TenderDto) => {

  tender.itemsNumber = tender.Lines != null ? tender.Lines.length : 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  tender.IsFemaleOwner ? tender.Messages?.push('') : null;
  // eslint-disable-next-line array-callback-return
  tender.Lines?.map((item) => {
    item.CurrencyId = tender.CurrencyId;
    item.IsPercentageCalculation = tender.IsPercentageCalculation;
  });
  state.TotalSummery = CalculateTenderTotal(tender);
  return tender;
}

const SetLastPropositionsDtoData = (state: CounterState, LastPropositions: LastPropositionsDto) => {
  return LastPropositions;
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
  bidConfirmStatus,
  setTotalSummery,
  startLoading,
  linePriceChanged,
} = tenderSlice.actions;

export const selectTender = (state: RootState) => state.Tender.Tender;
export const selectTotalSummery = (state: RootState) => state.Tender.TotalSummery;
export const selectLastPropositions = (state: RootState) => state.Tender.LastPropositionsdata;
export const selectBidConfirmStatus = (state: RootState) => state.Tender.BidConfirmStatus;
export default tenderSlice.reducer;