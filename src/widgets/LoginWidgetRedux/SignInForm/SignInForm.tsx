import React, { FC, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "src/api/signIn";
import { Button } from "src/components/Button";
import { Checkbox } from "src/components/Checkbox";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import {
  StyledActionsRow,
  StyledForm,
  StyledFormFooter,
  StyledLink,
  StyledTitle,
} from "src/widgets/LoginWidget";
import validate from "validate.js";
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

export interface SignInFormProps {
  onFormTypeChange: (type: FormType) => void;
}

export const SignInForm: FC<SignInFormProps> = memo(function SignInForm({
  onFormTypeChange,
}) {
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
    const emailValid = !validate({ data: email }, { data: { email: true } });

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

  const disableSignInButton = !email.value.length || !password.value.length;

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

      <FormGroup label="Password">
        <Input
          type="password"
          value={password.value}
          onChange={handlePasswordChange}
        />
      </FormGroup>

      <StyledActionsRow>
        <Checkbox
          checked={keepSign}
          label="Keep me signed in"
          onChange={handleKeepSignClick}
        />

        <StyledLink onClick={handleRestorePassClick}>
          Forgot Your Password?
        </StyledLink>
      </StyledActionsRow>

      <StyledFormFooter>
        <Button
          type="success"
          disabled={disableSignInButton}
          onClick={handleSignInClick}
        >
          Sign In
        </Button>

        <Button onClick={handleSignUpClick}>Register Now</Button>
      </StyledFormFooter>
    </StyledForm>
  );
});
