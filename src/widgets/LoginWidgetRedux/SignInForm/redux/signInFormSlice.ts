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

const signInFormSlice = createSlice({
  name: "signInForm",
  initialState,
  reducers: {
    reduceToInitial: () => initialState,
    setEmailValue: (state, { payload }) => {
      state.email.value = payload;
    },
    setPasswordValue: (state, { payload }) => {
      state.password.value = payload;
    },
    showEmailError: (state, { payload }) => {
      state.email.showError = payload;
    },
    showPasswordError: (state, { payload }) => {
      state.password.showError = payload;
    },
    setKeepSign: (state, { payload }) => {
      state.keepSign = payload;
    },
  },
});

export const {
  reduceToInitial,
  setEmailValue,
  setPasswordValue,
  showEmailError,
  showPasswordError,
  setKeepSign,
} = signInFormSlice.actions;

export const signInFormReducer = signInFormSlice.reducer;
