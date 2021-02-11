import { useCallback, useState } from "react";
import { signUp } from "src/api/signUp";
import { isEmailValid, useSignInForm } from "../SignInForm";
import { FormType } from "../types";

export interface UseSignUpFormData {
  onFormTypeChange: (type: FormType) => void;
}

export type UseSignUpForm = ReturnType<typeof useSignUpForm>;

export const useSignUpForm = ({ onFormTypeChange }: UseSignUpFormData) => {
  const {
    email,
    password,
    handlePasswordChange: changePassword,
    handleEmailChange,
    disableSubmit,
  } = useSignInForm({
    onFormTypeChange,
  });

  const [passwordCopy, setPasswordCopy] = useState({
    value: "",
    showError: false,
  });

  const handlePasswordChange = useCallback(({ value }) => {
    changePassword({ value });

    setPasswordCopy((prevValue) => ({ ...prevValue, showError: false }));
  }, []);

  const handlePasswordCopyChange = useCallback(({ value }) => {
    setPasswordCopy((prevValue) => ({ ...prevValue, value, showError: false }));

    changePassword({ showError: false });
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
      handleEmailChange({ showError: true });
    }

    if (!passMatch) {
      changePassword({ showError: true });

      setPasswordCopy((prevValue) => ({ ...prevValue, showError: true }));
    }
  }, [email.value, password.value, passwordCopy]);

  const handleSignInClick = useCallback(() => {
    onFormTypeChange(FormType.signIn);
  }, [onFormTypeChange]);

  return {
    email,
    password,
    passwordCopy,
    disableSubmit: disableSubmit || !passwordCopy.value.length,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordCopyChange,
    handleSignUpClick,
    handleSignInClick,
  };
};
