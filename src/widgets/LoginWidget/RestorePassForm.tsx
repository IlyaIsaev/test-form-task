import { transparentize } from "polished";
import React, { FC, memo, useCallback, useState } from "react";
import { restorePassword } from "src/api/restorePassword";
import { Button } from "src/components/Button";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import styled from "styled-components";
import validate from "validate.js";
import {
  StyledFormFooter,
  StyledLink as SimpleLink,
  StyledForm,
  StyledTitle,
} from "./SignInForm";
import { FormType } from "./types";

const StyledText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => transparentize(0.2, theme.colors.dark)};
  margin: 0 0 15px;
`;

const StyledActionsRow = styled.div`
  font-size: 18px;
  margin: 20px 0 0;
`;

const StyledLink = styled(SimpleLink)`
  font-size: 18px;
`;

export interface RestorePassFormProps {
  onFormTypeChange: (type: FormType) => void;
}

export const RestorePassForm: FC<RestorePassFormProps> = memo(
  function RestorePassForm({ onFormTypeChange }) {
    const [email, setEmail] = useState({
      value: "",
      showError: false,
    });

    const handleEmailChange = useCallback(({ value }: { value: string }) => {
      setEmail((prevValue) => ({ ...prevValue, value, showError: false }));
    }, []);

    const handleRestorePassClick = useCallback(async () => {
      const emailValid = !validate(
        { data: email.value },
        { data: { email: true } }
      );

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
        setEmail((prevValue) => ({
          ...prevValue,
          showError: true,
        }));
      }
    }, [email]);

    const handleSignInClick = useCallback(() => {
      onFormTypeChange(FormType.signIn);
    }, [onFormTypeChange]);

    const handleSignUpClick = useCallback(() => {
      onFormTypeChange(FormType.signUp);
    }, [onFormTypeChange]);

    const disableSignInButton = !email.value.length;

    return (
      <StyledForm>
        <StyledTitle>Forgot Your Password?</StyledTitle>
        <StyledText>
          Please enter your email address below and allow for a few minutes to
          receive the password
        </StyledText>

        <FormGroup
          label="Email"
          error="That doesn't look to be a valid email address. Please review and try again."
          showError={email.showError}
        >
          <Input
            type="email"
            value={email.value}
            onChange={handleEmailChange}
          />
        </FormGroup>

        <StyledFormFooter>
          <Button
            type="success"
            disabled={disableSignInButton}
            onClick={handleRestorePassClick}
          >
            Send
          </Button>
        </StyledFormFooter>

        <StyledActionsRow>
          <StyledLink onClick={handleSignInClick}>Sign In</StyledLink>
          &nbsp;or&nbsp;
          <StyledLink onClick={handleSignUpClick}>Register</StyledLink>
        </StyledActionsRow>
      </StyledForm>
    );
  }
);