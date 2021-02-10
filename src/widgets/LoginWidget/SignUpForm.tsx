import React, { FC, memo, useCallback, useState } from "react";
import { signUp } from "src/api/signUp";
import {Button} from "src/components/Button";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import validate from "validate.js";
import { StyledFormFooter, StyledForm, StyledTitle } from "./SignInForm";
import { FormType } from "./types";

export interface SignUpFormProps {
  onFormTypeChange: (type: FormType) => void;
}

export const SignUpForm: FC<SignUpFormProps> = memo(function SignUpForm({
  onFormTypeChange,
}) {
  const [email, setEmail] = useState({
    value: "",
    showError: false,
  });

  const [password, setPassword] = useState({
    value: "",
    showError: false,
  });

  const [passwordCopy, setPasswordCopy] = useState({
    value: "",
    showError: false,
  });

  const handleEmailChange = useCallback(({ value }: { value: string }) => {
    setEmail((prevValue) => ({ ...prevValue, value, showError: false }));
  }, []);

  const handlePasswordChange = useCallback(({ value }) => {
    setPassword((prevValue) => ({ ...prevValue, value, showError: false }));

    setPasswordCopy((prevValue) => ({ ...prevValue, showError: false }));
  }, []);

  const handlePasswordCopyChange = useCallback(({ value }) => {
    setPassword((prevValue) => ({ ...prevValue, showError: false }));

    setPasswordCopy((prevValue) => ({ ...prevValue, value, showError: false }));
  }, []);

  const handleSignUpClick = useCallback(async () => {
    const emailValid = !validate(
      { data: email.value },
      { data: { email: true } }
    );

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
      setEmail((prevValue) => ({
        ...prevValue,
        showError: true,
      }));
    }

    if (!passMatch) {
      setPassword((prevValue) => ({ ...prevValue, showError: true }));

      setPasswordCopy((prevValue) => ({ ...prevValue, showError: true }));
    }
  }, [email, password, passwordCopy]);

  const handleSignInClick = useCallback(() => {
    onFormTypeChange(FormType.signIn);
  }, [onFormTypeChange]);

  const disableSignUpButton =
    !email.value.length || !password.value.length || !passwordCopy.value.length;

  return (
    <StyledForm>
      <StyledTitle>Sign In</StyledTitle>

      <FormGroup
        label="Email"
        error="That doesn't look to be a valid email address. Please review and try again."
        showError={email.showError}
      >
        <Input type="email" value={email.value} onChange={handleEmailChange} />
      </FormGroup>

      <FormGroup
        label="Password"
        error="Your passwords do not match. Please review and try again."
        showError={password.showError}
      >
        <Input
          type="password"
          value={password.value}
          onChange={handlePasswordChange}
        />
      </FormGroup>

      <FormGroup
        label="Re-type Password"
        error="Your passwords do not match. Please review and try again."
        showError={passwordCopy.showError}
      >
        <Input
          type="password"
          value={passwordCopy.value}
          onChange={handlePasswordCopyChange}
        />
      </FormGroup>

      <StyledFormFooter>
        <Button
          type="success"
          disabled={disableSignUpButton}
          onClick={handleSignUpClick}
        >
          Register Your Account
        </Button>

        <Button onClick={handleSignInClick}>Sign In</Button>
      </StyledFormFooter>
    </StyledForm>
  );
});
