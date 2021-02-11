import React, { FC, memo } from "react";
import { SignUpFormView } from "./SignUpFormView";
import { useSignUpForm, UseSignUpFormData } from "./useSignUpForm";

export type SignUpFormProps = UseSignUpFormData;

export const SignUpForm: FC<SignUpFormProps> = memo(function SignUpForm({
  onFormTypeChange,
}) {
  const signUpFormViewProps = useSignUpForm({ onFormTypeChange });

  return <SignUpFormView {...signUpFormViewProps} />;
});
