import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import LpauDto from './Dtos/LpauDto';


const API_URL_LeadingPropositionAndUser = "/LeadingPropositionAndUser.json";

// initial state
export const initialState = {
    loading: false,
    error: false,
    lpaudata: new LpauDto()
};

export const LpauSlice = createSlice({
    name: "lpaudata",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeadingPropositionAndUserAsync.fulfilled, (state, action) => {
                state.lpaudata = action.payload;
            })
    },
});
export const fetchLeadingPropositionAndUserAsync = createAsyncThunk('lpaudata/get', async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL_LeadingPropositionAndUser}`);
        return response.data;
    } catch (err) {
        return err;
    }
}
);

export const {
    startLoading,
} = LpauSlice.actions;

export const selectLpau = (state: { lpaudata: { lpaudata: any; }; }) => state.lpaudata;

export default LpauSlice.reducer;
