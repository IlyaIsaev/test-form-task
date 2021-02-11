import { createSlice } from "@reduxjs/toolkit";
import { formBaseState, getFormBaseReducers } from "../../SignInForm";

const { email } = formBaseState;

export const initialState = { email };

const {
  reduceToInitial: reduceToInitialReducer,
  setEmailValue: setEmailValueReducer,
  showEmailError: showEmailErrorReducer,
} = getFormBaseReducers(initialState);

const restorePassFormSlice = createSlice({
  name: "restorePassForm",
  initialState,
  reducers: {
    reduceToInitial: reduceToInitialReducer,
    setEmailValue: setEmailValueReducer,
    showEmailError: showEmailErrorReducer,
  },
});

export const {
  reduceToInitial,
  setEmailValue,
  showEmailError,
} = restorePassFormSlice.actions;

export const restorePassFormReducer = restorePassFormSlice.reducer;
