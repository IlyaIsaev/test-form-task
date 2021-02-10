import React, { FC, memo, useCallback, useState } from "react";
import { signIn } from "src/api/signIn";
import { Button } from "src/components/Button";
import { Checkbox } from "src/components/Checkbox";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import styled from "styled-components";
import validate from "validate.js";
import { FormType } from "./types";

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTitle = styled.div`
  font-size: 20px;
  align-self: flex-start;
  margin: 0 0 15px;
`;

export const StyledActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  margin: 20px 0 0;
`;

export const StyledFormFooter = styled.div`
  align-self: stretch;
  display: grid;
  row-gap: 10px;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  justify-items: stretch;
  margin: 20px 0 0;
`;

export const StyledLink = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease-out 0s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export interface SignInFormProps {
  onFormTypeChange: (type: FormType) => void;
}

export const SignInForm: FC<SignInFormProps> = memo(function SignInForm({
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

  const [keepSign, setKeepSign] = useState(false);

  const handleKeepSignClick = useCallback((value) => {
    setKeepSign(value);
  }, []);

  const handleEmailChange = useCallback(({ value }: { value: string }) => {
    setEmail((prevValue) => ({ ...prevValue, value, showError: false }));
  }, []);

  const handlePasswordChange = useCallback(({ value }) => {
    setPassword((prevValue) => ({ ...prevValue, value }));
  }, []);

  const handleSignInClick = useCallback(async () => {
    const emailValid = !validate(
      { data: email.value },
      { data: { email: true } }
    );

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
  }, [email, password, keepSign]);

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
