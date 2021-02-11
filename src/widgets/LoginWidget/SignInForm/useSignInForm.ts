import { useCallback, useState } from "react";
import { signIn } from "src/api/signIn";
import validate from "validate.js";
import { FormType } from "../types";

export const isEmailValid = (email: string) =>
  !validate({ data: email }, { data: { email: true } });

export interface UseSignInFormData {
  onFormTypeChange: (type: FormType) => void;
}

export type UseSignInForm = ReturnType<typeof useSignInForm>;

export const useSignInForm = ({ onFormTypeChange }: UseSignInFormData) => {
  const [email, setEmail] = useState({
    value: "",
    showError: false,
  });

  const [password, setPassword] = useState({
    value: "",
    showError: false,
  });

  const [keepSign, setKeepSign] = useState(false);

  const handleKeepSignClick = useCallback((value) => {
    setKeepSign(value);
  }, []);

  const handleEmailChange = useCallback(({ value, showError = false }) => {
    setEmail((prevValue) => ({
      value: value ?? prevValue.value,
      showError,
    }));
  }, []);

  const handlePasswordChange = useCallback(({ value, showError = false }) => {
    setPassword((prevValue) => ({
      value: value ?? prevValue.value,
      showError,
    }));
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
      setEmail((prevValue) => ({
        ...prevValue,
        showError: true,
      }));
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
