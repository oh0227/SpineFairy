// store/reportSlice.js
import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: null,
  },
  reducers: {
    setReport(state, action) {
      state.data = action.payload;
    },
    clearReport(state) {
      state.data = null;
    },
  },
});

export const { setReport, clearReport } = reportSlice.actions;
export default reportSlice.reducer;
