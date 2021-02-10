import { ChangeEvent, FC, memo, useCallback } from "react";
import validate from "validate.js";
import { InputDefault, InputDefaultProps } from "./InputDefault";

export type InputEmailProps = Omit<InputDefaultProps, "type" | "onChange"> & {
  checkValidity?: boolean;
  onChange: (
    data: { value: string; valid?: boolean },
    e: ChangeEvent<HTMLInputElement>
  ) => void;
};

export const InputEmail: FC<InputEmailProps> = memo(function InputEmail({
  checkValidity,
  onChange,
  ...props
}) {
  const handleChange = useCallback(
    ({ value }, e) => {
      onChange(
        {
          value,
          valid: checkValidity
            ? !validate({ data: value }, { data: { email: true } })
            : undefined,
        },
        e
      );
    },
    [checkValidity, onChange]
  );

  return <InputDefault type="email" onChange={handleChange} {...props} />;
});
