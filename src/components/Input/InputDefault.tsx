import { ChangeEvent, FC, memo, useCallback } from "react";
import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  display: block;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 0 10px;
  outline: none;
  transition: all 0.2s ease-out 0s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export interface InputDefaultProps {
  value: string;
  type?: "text" | "password" | "email";
  className?: string;
  onChange: (data: { value: string }, e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDefault: FC<InputDefaultProps> = memo(function InputDefault({
  type = "text",
  onChange,
  ...props
}) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(
        {
          value: e.target.value,
        },
        e
      );
    },
    [onChange]
  );

  return <StyledInput type={type} onChange={handleChange} {...props} />;
});
