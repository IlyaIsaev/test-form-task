import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const formBaseState = {
  email: {
    value: "",
    showError: false,
  },
  password: {
    value: "",
    showError: false,
  },
};

export type FormBaseState = typeof formBaseState;

const initialState = {
  ...formBaseState,
  keepSign: false,
};

export const getFormBaseReducers = <S extends Partial<FormBaseState>>(
  initialState: S
) => ({
  reduceToInitial: () => initialState,
  setEmailValue: (
    state: S,
    { payload }: PayloadAction<FormBaseState["email"]["value"]>
  ) => {
    if (state.email) {
      state.email.value = payload;
    }
  },
  setPasswordValue: (
    state: S,
    { payload }: PayloadAction<FormBaseState["password"]["value"]>
  ) => {
    if (state.password) {
      state.password.value = payload;
    }
  },
  showEmailError: (
    state: S,
    { payload }: PayloadAction<FormBaseState["email"]["showError"]>
  ) => {
    if (state.email) {
      state.email.showError = payload;
    }
  },
  showPasswordError: (
    state: S,
    { payload }: PayloadAction<FormBaseState["password"]["showError"]>
  ) => {
    if (state.password) {
      state.password.showError = payload;
    }
  },
});

const signInFormSlice = createSlice({
  name: "signInForm",
  initialState,
  reducers: {
    ...getFormBaseReducers(initialState),
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
