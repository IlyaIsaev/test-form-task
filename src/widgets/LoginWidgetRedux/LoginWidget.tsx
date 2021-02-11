import React, { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledLoginWidget, StyledLogo } from "../LoginWidget";
import { setFormType } from "./redux/formTypeSlice";
import { RootState } from "./redux/store";
import { RestorePassForm } from "./RestorePassForm";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { FormType } from "./types";

export const LoginWidget: FC = memo(function LoginWidget() {
  const dispatch = useDispatch();

  const formType = useSelector<RootState>(({ formType }) => formType);

  const handleFormTypeChange = useCallback((type: FormType) => {
    dispatch(setFormType(type));
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
