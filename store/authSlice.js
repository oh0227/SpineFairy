import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogIn: false,
    userData: null,
    didTryAutoLogin: false,
    isSetUp: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.isLogIn = true;
      state.userData = payload.userData;
    },
    logout: (state, action) => {
      state.isLogIn = false;
      state.userData = null;
      state.didTryAutoLogin = false;
    },
    updateLoggedInUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload.newData };
    },
    setUp: (state, action) => {
      state.isSetUp = true;
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export const updateLoggedInUserData = authSlice.actions.updateLoggedInUserData;
export const logout = authSlice.actions.logout;
export const setUp = authSlice.actions.setUp;
export default authSlice.reducer;
