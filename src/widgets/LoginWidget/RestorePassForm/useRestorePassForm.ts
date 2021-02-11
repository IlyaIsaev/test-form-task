import {useCallback} from "react";
import {restorePassword} from "src/api/restorePassword";
import {isEmailValid, useSignInForm} from "../SignInForm";
import {FormType} from "../types";

export interface UseRestorePassFormData {
  onFormTypeChange: (type: FormType) => void;
}

export type UseRestorePassForm = ReturnType<typeof useRestorePassForm>;

export const useRestorePassForm = ({
  onFormTypeChange,
}: UseRestorePassFormData) => {
  const { email, handleEmailChange } = useSignInForm({
    onFormTypeChange,
  });

  const handleRestorePassClick = useCallback(async () => {
    const emailValid = isEmailValid(email.value);

    if (emailValid) {
      try {
        const result = await restorePassword({
          email: email.value,
        });

        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }

    if (!emailValid) {
      handleEmailChange({ showError: true });
    }
  }, [email.value]);

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
