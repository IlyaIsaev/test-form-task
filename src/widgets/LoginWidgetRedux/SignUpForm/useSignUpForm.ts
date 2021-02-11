import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "src/api/signUp";
import { isEmailValid } from "src/widgets/LoginWidget";
import { RootState } from "../redux/store";
import { FormType } from "../types";
import {
  reduceToInitial,
  setEmailValue,
  setPasswordCopyValue,
  setPasswordValue,
  showEmailError,
  showPasswordCopyError,
  showPasswordError,
} from "./redux";

export interface UseSignUpFormData {
  onFormTypeChange: (type: FormType) => void;
}

export type UseSignUpForm = ReturnType<typeof useSignUpForm>;

export const useSignUpForm = ({ onFormTypeChange }: UseSignUpFormData) => {
  const dispatch = useDispatch();

  const { email, password, passwordCopy } = useSelector<
    RootState,
    RootState["signUpForm"]
  >(({ signUpForm }) => signUpForm);

  useEffect(() => {
    return () => {
      dispatch(reduceToInitial());
    };
  }, []);

  const handleEmailChange = useCallback(({ value }: { value: string }) => {
    dispatch(setEmailValue(value));

    dispatch(showEmailError(false));
  }, []);

  const handlePasswordChange = useCallback(({ value }) => {
    dispatch(setPasswordValue(value));

    dispatch(showPasswordError(false));

    dispatch(showPasswordCopyError(false));
  }, []);

  const handlePasswordCopyChange = useCallback(({ value }) => {
    dispatch(setPasswordCopyValue(value));

    dispatch(showPasswordError(false));

    dispatch(showPasswordCopyError(false));
  }, []);

  const handleSignUpClick = useCallback(async () => {
    const emailValid = isEmailValid(email.value);

    const passMatch = password.value === passwordCopy.value;

    if (emailValid && passMatch) {
      try {
        const result = await signUp({
          email: email.value,
          password: password.value,
        });

        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }

    if (!emailValid) {
      dispatch(showEmailError(true));
    }

    if (!passMatch) {
      dispatch(showPasswordError(true));

      dispatch(showPasswordCopyError(true));
    }
  }, [email, password.value, passwordCopy.value]);

  const handleSignInClick = useCallback(() => {
    onFormTypeChange(FormType.signIn);
  }, [onFormTypeChange]);

  const disableSubmit =
    !email.value.length || !password.value.length || !passwordCopy.value.length;

  return {
    email,
    password,
    passwordCopy,
    disableSubmit,
    handleSignInClick,
    handleSignUpClick,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordCopyChange,
  };
};
