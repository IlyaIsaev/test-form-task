import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "src/api/signIn";
import { isEmailValid } from "src/widgets/LoginWidget";
import { RootState } from "../redux/store";
import { FormType } from "../types";
import {
  reduceToInitial,
  setEmailValue,
  setKeepSign,
  setPasswordValue,
  showEmailError,
  showPasswordError,
} from "./redux";

export interface UseSignInFormData {
  onFormTypeChange: (type: FormType) => void;
}

export type UseSignInForm = ReturnType<typeof useSignInForm>;

export const useSignInForm = ({ onFormTypeChange }: UseSignInFormData) => {
  const dispatch = useDispatch();

  const { email, password, keepSign } = useSelector<
    RootState,
    RootState["signInForm"]
  >(({ signInForm }) => signInForm);

  useEffect(() => {
    return () => {
      dispatch(reduceToInitial());
    };
  }, []);

  const handleKeepSignClick = useCallback((value) => {
    dispatch(setKeepSign(value));
  }, []);

  const handleEmailChange = useCallback(({ value }: { value: string }) => {
    dispatch(setEmailValue(value));

    dispatch(showEmailError(false));
  }, []);

  const handlePasswordChange = useCallback(({ value }) => {
    dispatch(setPasswordValue(value));

    dispatch(showPasswordError(false));
  }, []);

  const handleSignInClick = useCallback(async () => {
    const emailValid = isEmailValid(email.value);

    if (emailValid) {
      try {
        const result = await signIn({
          email: email.value,
          password: password.value,
          keepSign,
        });

        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }

    if (!emailValid) {
      dispatch(showEmailError(true));
    }
  }, [email.value, password.value, keepSign]);

  const handleSignUpClick = useCallback(() => {
    onFormTypeChange(FormType.signUp);
  }, [onFormTypeChange]);

  const handleRestorePassClick = useCallback(() => {
    onFormTypeChange(FormType.restorePassword);
  }, [onFormTypeChange]);

  const disableSubmit = !email.value.length || !password.value.length;

  return {
    email,
    password,
    keepSign,
    disableSubmit,
    handleSignInClick,
    handleSignUpClick,
    handleRestorePassClick,
    handleKeepSignClick,
    handleEmailChange,
    handlePasswordChange,
  };
};
