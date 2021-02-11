import { createSlice } from "@reduxjs/toolkit";
import { formBaseState, getFormBaseReducers } from "../../SignInForm";

export const initialState = {
  ...formBaseState,
  passwordCopy: {
    value: "",
    showError: false,
  },
};

const signUpFormSlice = createSlice({
  name: "signUpForm",
  initialState,
  reducers: {
    ...getFormBaseReducers(initialState),
    setPasswordCopyValue: (state, { payload }) => {
      state.passwordCopy.value = payload;
    },
    showPasswordCopyError: (state, { payload }) => {
      state.passwordCopy.showError = payload;
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
} = signUpFormSlice.actions;

export const signUpFormReducer = signUpFormSlice.reducer;
