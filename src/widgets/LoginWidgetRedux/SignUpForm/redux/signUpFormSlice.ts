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
  passwordCopy: {
    value: "",
    showError: false,
  },
  keepSign: false,
};

const signUpFormSlice = createSlice({
  name: "signUpForm",
  initialState,
  reducers: {
    reduceToInitial: () => initialState,
    setEmailValue: (state, { payload }) => {
      state.email.value = payload;
    },
    setPasswordValue: (state, { payload }) => {
      state.password.value = payload;
    },
    setPasswordCopyValue: (state, { payload }) => {
      state.passwordCopy.value = payload;
    },
    showEmailError: (state, { payload }) => {
      state.email.showError = payload;
    },
    showPasswordError: (state, { payload }) => {
      state.password.showError = payload;
    },
    showPasswordCopyError: (state, { payload }) => {
      state.passwordCopy.showError = payload;
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
  setPasswordCopyValue,
  showEmailError,
  showPasswordError,
  showPasswordCopyError,
  setKeepSign,
} = signUpFormSlice.actions;

export const signUpFormReducer = signUpFormSlice.reducer;
