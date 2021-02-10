import { transparentize } from "polished";
import { FC, memo } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 6px;
  border: none;
  outline: none;
  transition: all 0.2s ease-out 0s;
  font-size: 20px;
  line-height: 1;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
`;

const SuccessButton = styled(StyledButton)`
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.success};

  &:hover {
    background: ${({ theme }) => transparentize(0.3, theme.colors.success)};
  }

  &:active {
    background: ${({ theme }) => theme.colors.success};
  }
`;

const DefaultButton = styled(StyledButton)`
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.secondaryLight};

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export interface ButtonProps {
  type?: "success";
}

export const Button: FC<ButtonProps> = memo(function Button({
  type,
  ...props
}) {
  if (type === "success") {
    return <SuccessButton {...props} />;
  }

  return <DefaultButton {...props} />;
});
