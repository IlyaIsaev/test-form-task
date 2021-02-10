import React, { FC, memo, useCallback, useState } from "react";
import { Logo } from "src/components/Logo";
import styled from "styled-components";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";
import { FormType } from "./types";
import { RestorePassForm } from "./RestorePassForm";

const StyledLoginWidget = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
`;

const StyledLogo = styled(Logo)`
  align-self: center;
  margin: 0 0 40px;
`;

export const LoginWidget: FC = memo(function LoginWidget() {
  const [formType, setFormType] = useState<FormType>(FormType.signIn);

  const handleFormTypeChange = useCallback((type: FormType) => {
    setFormType(type);
  }, []);

  return (
    <StyledLoginWidget>
      <StyledLogo />

      {formType === FormType.signUp && (
        <SignUpForm onFormTypeChange={handleFormTypeChange} />
      )}

      {formType === FormType.signIn && (
        <SignInForm onFormTypeChange={handleFormTypeChange} />
      )}

      {formType === FormType.restorePassword && (
        <RestorePassForm onFormTypeChange={handleFormTypeChange} />
      )}
    </StyledLoginWidget>
  );
});
