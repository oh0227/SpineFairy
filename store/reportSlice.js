// store/reportSlice.js
import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reportData: {},
  },
  reducers: {
    // 분석 결과 추가
    addReport(state, action) {
      state.reportData = action.payload;
    },
    // 분석 전체 초기화
    clearReports(state) {
      state.history = [];
      state.latest = null;
    },
    // 선택적으로 분석 기록 대체 (예: 백엔드에서 전체 불러올 때)
    setAllReports(state, action) {
      state.history = action.payload;
      state.latest = action.payload[0] || null;
    },
  },
});

export const { addReport, clearReports, setAllReports } = reportSlice.actions;
export default reportSlice.reducer;
