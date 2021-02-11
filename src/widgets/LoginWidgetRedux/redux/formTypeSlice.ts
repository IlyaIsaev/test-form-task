import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormType } from "../types";

const formTypeSlice = createSlice({
  name: "formType",
  initialState: FormType.signIn,
  reducers: {
    setFormType: (_state, action: PayloadAction<FormType>) => {
      return action.payload;
    },
  },
});

export const { setFormType } = formTypeSlice.actions;

export default formTypeSlice.reducer;
