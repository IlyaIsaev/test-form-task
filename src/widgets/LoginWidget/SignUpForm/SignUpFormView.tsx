import React, { FC, memo } from "react";
import { Button } from "src/components/Button";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import { StyledForm, StyledFormFooter, StyledTitle } from "../SignInForm";
import { UseSignUpForm } from "./useSignUpForm";

export type SignUpFormViewProps = UseSignUpForm;

export const SignUpFormView: FC<SignUpFormViewProps> = memo(
  function SignUpFormView({
    email,
    password,
    passwordCopy,
    disableSubmit,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordCopyChange,
    handleSignUpClick,
    handleSignInClick,
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
            disabled={disableSubmit}
            onClick={handleSignUpClick}
          >
            Register Your Account
          </Button>

          <Button onClick={handleSignInClick}>Sign In</Button>
        </StyledFormFooter>
      </StyledForm>
    );
  }
);
