import { transparentize } from "polished";
import React, { FC, memo } from "react";
import { Button } from "src/components/Button";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import styled from "styled-components";
import {
  StyledForm,
  StyledFormFooter,
  StyledLink as SimpleLink,
  StyledTitle,
} from "../SignInForm";
import { UseRestorePassForm } from "./useRestorePassForm";

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

export type RestorePassFormViewProps = UseRestorePassForm;

export const RestorePassFormView: FC<RestorePassFormViewProps> = memo(
  function RestorePassFormView({
    email,
    disableSubmit,
    handleEmailChange,
    handleSignInClick,
    handleRestorePassClick,
    handleSignUpClick,
  }) {
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
            disabled={disableSubmit}
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
