import { createAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { restorePassword as restorePasswordApi } from "src/api/restorePassword";
import { initialState } from "./restorePassFormSlice";

export const restorePassword = createAction<{
  email: typeof initialState["email"]["value"];
}>("restorePassword");

function* handleSignInSaga(action: ReturnType<typeof restorePassword>) {
  try {
    yield call(restorePasswordApi, action.payload);

    console.log("RESTORE PASSWORD SUCCEEDED");
  } catch (e) {
    console.log("RESTORE PASSWORD FAILED", e);
  }
}

export function* restorePasswordSaga() {
  yield takeLatest(restorePassword, handleSignInSaga);
}
