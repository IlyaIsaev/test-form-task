import React, { FC, memo } from "react";
import { SignInFormView } from "src/widgets/LoginWidget";
import { useSignInForm, UseSignInFormData } from "./useSignInForm";

export type SignInFormProps = UseSignInFormData;

export const SignInForm: FC<SignInFormProps> = memo(function SignInForm({
  onFormTypeChange,
}) {
  const signInFormViewProps = useSignInForm({ onFormTypeChange });

  return <SignInFormView {...signInFormViewProps} />;
});
