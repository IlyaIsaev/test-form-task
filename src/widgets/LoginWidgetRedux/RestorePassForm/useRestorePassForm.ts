import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmailValid } from "src/widgets/LoginWidget";
import { RootState } from "../redux/store";
import { FormType } from "../types";
import {
  restorePassword,
  reduceToInitial,
  setEmailValue,
  showEmailError,
} from "./redux";

export interface UseRestorePassFormData {
  onFormTypeChange: (type: FormType) => void;
}

export type UseRestorePassForm = ReturnType<typeof useRestorePassForm>;

export const useRestorePassForm = ({
  onFormTypeChange,
}: UseRestorePassFormData) => {
  const dispatch = useDispatch();

  const { email } = useSelector<RootState, RootState["restorePassForm"]>(
    ({ restorePassForm }) => restorePassForm
  );

  useEffect(() => {
    return () => {
      dispatch(reduceToInitial());
    };
  }, []);

  const handleEmailChange = useCallback(({ value }: { value: string }) => {
    dispatch(setEmailValue(value));

    dispatch(showEmailError(false));
  }, []);

  const handleRestorePassClick = useCallback(async () => {
    const emailValid = isEmailValid(email.value);

    if (emailValid) {
      dispatch(restorePassword({ email: email.value }));
    }

    if (!emailValid) {
      if (!emailValid) {
        dispatch(showEmailError(true));
      }
    }
  }, [email]);

  const handleSignInClick = useCallback(() => {
    onFormTypeChange(FormType.signIn);
  }, [onFormTypeChange]);

  const handleSignUpClick = useCallback(() => {
    onFormTypeChange(FormType.signUp);
  }, [onFormTypeChange]);

  return {
    email,
    disableSubmit: !email.value.length,
    handleEmailChange,
    handleSignInClick,
    handleSignUpClick,
    handleRestorePassClick,
  };
};
