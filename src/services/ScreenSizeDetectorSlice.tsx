import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const initialState = {
  ScreenSize: [],
};

export const ScreenSizeDetectorSlice = createSlice({
  name: "ScreenSize",
  initialState,
  reducers: {
    ScreenSizeValue: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreenSizeAsync.fulfilled, (state, action) => {
        const defaultOptions = {
          onHeightChange: () => { }, // OPTIONAL: A callback to trigger on screen height change
          onWidthChange: () => { }, // OPTIONAL: A callback to trigger on screen width change
          onBothChange: () => { }, // OPTIONAL: A callback to trigger on screen width and height change
          widthDefinitions: { // Width definitions object. Can be overwritten, added or removed
            smartwatch: {
              min: 0,
              max: 319,
              inclusion: "[]",
            },
            mobile: {
              min: 320,
              max: 480,
              inclusion: "[]",
            },
            tablet: { // Width category name. Will appear on <instance>.is.<width category name> Ex: screen.is.tablet which will return true or false
              min: 481, // Minimum screen width in pixel for this category
              max: 768, // Maximum screen width in pixel for this category 
              inclusion: "[]", // "inclusion" will only accept the combination of either '[]', '[)', '(]' or '()'. '[' means include the min value, '(' means exclude the min value, ']' means include the max value and ')' means exclude the max value.

              /* For the example of this 'tablet' category, this is what it means for the inclusion:
                  If '[]' is provided: Range for smartwatch is defined is 481 px - 768 px
                  If '[)' is provided: Range for smartwatch is defined is 481 px - 767 px
                  If '(]' is provided: Range for smartwatch is defined is 480 px - 768 px
                  If '()' is provided: Range for smartwatch is defined is 480 px - 767 px
              */
              onEnter: () => { }, // OPTIONAL: A callback that will be triggered once screen width enters this width range (481px - 768px)
              whileInside: () => { }, // OPTIONAL: A callback that will be triggered while screen width changes within this width range (481px - 768px)
              onLeave: () => { }, // OPTIONAL: A callback that will be triggered once screen width leaves this range (481px - 768px)
            },
            laptop: {
              min: 769,
              max: 1024,
              inclusion: "[]",
            },
            desktop: {
              min: 1025,
              max: 1900,
              inclusion: "[]",
            },
            largedesktop: {
              min: 1201,
              max: Infinity,
              inclusion: "[]",
            },
          },
        };
        const ScreenSizeDetector = require('screen-size-detector');
        const screen = new ScreenSizeDetector(defaultOptions);
        state.ScreenSize = screen;
      })
  }
});

export const fetchScreenSizeAsync = createAsyncThunk('ScreenSize/get', async (thunkAPI) => {
  try {
  } catch (err) {
    return err;
  }
});

export const {
  ScreenSizeValue,
} = ScreenSizeDetectorSlice.actions;

export const selectScreenSize = (state: RootState) => state.ScreenSize;
export default ScreenSizeDetectorSlice.reducer;