import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: {
    value: "",
    showError: false,
  },
  password: {
    value: "",
    showError: false,
  },
  keepSign: false,
};

const restorePassFormSlice = createSlice({
  name: "restorePassForm",
  initialState,
  reducers: {
    reduceToInitial: () => initialState,
    setEmailValue: (state, { payload }) => {
      state.email.value = payload;
    },
    showEmailError: (state, { payload }) => {
      state.email.showError = payload;
    },
  },
});

export const {
  reduceToInitial,
  setEmailValue,
  showEmailError,
} = restorePassFormSlice.actions;

export const restorePassFormReducer = restorePassFormSlice.reducer;
