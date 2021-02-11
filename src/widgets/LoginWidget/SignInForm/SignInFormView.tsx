import React, { FC, memo } from "react";
import { Button } from "src/components/Button";
import { Checkbox } from "src/components/Checkbox";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import styled from "styled-components";
import { UseSignInForm } from "./useSignInForm";

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

export type SignInFormViewProps = UseSignInForm;

export const SignInFormView: FC<SignInFormViewProps> = memo(
  function SignInFormView({
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
  }) {
    return (
      <StyledForm>
        <StyledTitle>Sign In</StyledTitle>

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
            disabled={disableSubmit}
            onClick={handleSignInClick}
          >
            Sign In
          </Button>

          <Button onClick={handleSignUpClick}>Register Now</Button>
        </StyledFormFooter>
      </StyledForm>
    );
  }
);
