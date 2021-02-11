import React, { FC, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { signUp } from "src/api/signUp";
import { Button } from "src/components/Button";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import {
  StyledForm,
  StyledFormFooter,
  StyledTitle,
} from "src/widgets/LoginWidget";
import validate from "validate.js";
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

export interface SignUpFormProps {
  onFormTypeChange: (type: FormType) => void;
}

export const SignUpForm: FC<SignUpFormProps> = memo(function SignUpForm({
  onFormTypeChange,
}) {
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
