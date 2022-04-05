import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import UsersDto from "./UsersDto";
import userDto from './UsersDto';

  export interface UserState {
    user: userDto
  }

  export const initialState: UserState = {
    user:new userDto()
  };
  
  const API_URL_Users = "/fakeUser.json";

  export const UsersSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.user = GetUserDtoData(state, action.payload);
          })
      }
  })

  const GetUserDtoData = (state: UserState, userData: UsersDto) => {
    return userData;
  }

  export const fetchUserAsync = createAsyncThunk('usersdata/post', async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL_Users}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

  export const {
    getUser,
  } = UsersSlice.actions;

export const selectUser = (state: RootState) => state.User.user;
 export default UsersSlice.reducer;