import { ChangeEvent, FC, memo } from "react";
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
  type?: "text" | "password";
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDefault: FC<InputDefaultProps> = memo(function InputDefault({
  type = "text",
  ...props
}) {
  return <StyledInput type={type} {...props} />;
});
