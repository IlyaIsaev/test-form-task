import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formTypeReducer from "./formTypeSlice";
import { signInFormReducer } from "../SignInForm";
import { signUpFormReducer } from "../SignUpForm";
import { restorePassFormReducer } from "../RestorePassForm";

const rootReducer = combineReducers({
  formType: formTypeReducer,
  signInForm: signInFormReducer,
  signUpForm: signUpFormReducer,
  restorePassForm: restorePassFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
