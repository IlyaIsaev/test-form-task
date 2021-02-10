import React, { ChangeEvent, FC, memo, useCallback } from "react";
import { Button } from "src/components/Button";
import { Checkbox } from "src/components/Checkbox";
import { FormGroup } from "src/components/FormGroup";
import { Input } from "src/components/Input";
import { Logo } from "src/components/Logo";
import styled from "styled-components";

const StyledLoginForm = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  align-self: flex-start;
  margin: 0 0 15px;
`;

const StyledLogo = styled(Logo)`
  margin: 0 0 40px;
`;

const StyledActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  margin: 20px 0;
`;

const SimpleLink = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  align-self: stretch;

  & + & {
    margin-top: 10px;
  }
`;

export interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}: LoginFormProps) => {
  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {},
    []
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {},
    []
  );

  const handleKeepSignedInClick = useCallback((value: boolean) => {}, []);

  return (
    <StyledLoginForm>
      <StyledLogo />

      <StyledTitle>Sign In</StyledTitle>

      <FormGroup label="Email">
        <Input value="" onChange={handleEmailChange} />
      </FormGroup>

      <FormGroup label="Password">
        <Input type="password" value="" onChange={handlePasswordChange} />
      </FormGroup>

      <StyledActionsRow>
        <Checkbox
          checked={false}
          label="Keep me signed in"
          onChange={handleKeepSignedInClick}
        />

        <SimpleLink>Forgot Your Password?</SimpleLink>
      </StyledActionsRow>

      <StyledButton type="success">Sign In</StyledButton>

      <StyledButton>Register Now</StyledButton>
    </StyledLoginForm>
  );
};

export default memo(LoginForm);
