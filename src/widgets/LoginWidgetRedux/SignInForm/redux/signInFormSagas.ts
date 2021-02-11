import { createAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { signIn as singInApi } from "src/api/signIn";
import { initialState } from "./signInFormSlice";

export const signIn = createAction<{
  email: typeof initialState["email"]["value"];
  password: typeof initialState["password"]["value"];
  keepSign: typeof initialState["keepSign"];
}>("signIn");

function* handleSignInSaga(action: ReturnType<typeof signIn>) {
  try {
    yield call(singInApi, action.payload);

    console.log("LOGIN SUCCEEDED");
  } catch (e) {
    console.log("LOGIN FAILED", e);
  }
}

export function* signInSaga() {
  yield takeLatest(signIn, handleSignInSaga);
}
