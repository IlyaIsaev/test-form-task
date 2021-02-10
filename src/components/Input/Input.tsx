import React, { FC, memo } from "react";
import { InputDefault, InputDefaultProps } from "./InputDefault";
import { InputEmail } from "./InputEmail";
import { InputPassword } from "./InputPassword";

export type InputProps = InputDefaultProps;

export const Input: FC<InputProps> = memo(function Input({
  type = "text",
  ...props
}) {
  if (type === "password") {
    return <InputPassword {...props} />;
  }

  if (type === "email") {
    return <InputEmail {...props} />;
  }

  return <InputDefault type={type} {...props} />;
});
