import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import formTypeReducer from "./formTypeSlice";
import { signInFormReducer, signInSaga } from "../SignInForm";
import { signUpFormReducer, signUpSaga } from "../SignUpForm";
import {
  restorePassFormReducer,
  restorePasswordSaga,
} from "../RestorePassForm";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  formType: formTypeReducer,
  signInForm: signInFormReducer,
  signUpForm: signUpFormReducer,
  restorePassForm: restorePassFormReducer,
});

function* rootSaga() {
  yield all([signInSaga(), signUpSaga(), restorePasswordSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
