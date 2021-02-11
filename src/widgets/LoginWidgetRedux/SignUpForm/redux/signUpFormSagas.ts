import { createAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { signUp as signUpApi } from "src/api/signUp";
import { initialState } from "./signUpFormSlice";

export const signUp = createAction<{
  email: typeof initialState["email"]["value"];
  password: typeof initialState["password"]["value"];
}>("signUp");

function* handleSignInSaga(action: ReturnType<typeof signUp>) {
  try {
    yield call(signUpApi, action.payload);

    console.log("SIGN UP SUCCEEDED");
  } catch (e) {
    console.log("SIGN UP FAILED", e);
  }
}

export function* signUpSaga() {
  yield takeLatest(signUp, handleSignInSaga);
}
