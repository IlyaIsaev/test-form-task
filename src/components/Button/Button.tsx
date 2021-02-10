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

  ${({ theme, disabled }) => {
    if (disabled) {
      return `
        cursor: default;
        background: ${theme.colors.secondary};
      `;
    }

    return `
      background: ${theme.colors.success};

      &:hover {
        background: ${transparentize(0.3, theme.colors.success)};
      }

      &:active {
        background: ${theme.colors.success};
      }
    `;
  }}
`;

const DefaultButton = styled(StyledButton)`
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.secondary};

  ${({ theme, disabled }) => {
    if (disabled) {
      return `
        background: ${theme.colors.secondary};
      `;
    }

    return `
      background: ${theme.colors.secondaryLight};

      &:hover {
        background: ${theme.colors.light};
      }

      &:active {
        background: ${theme.colors.secondaryLight};
      }
    `;
  }}
`;

export interface ButtonProps {
  type?: "success";
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = memo(function Button({
  type,
  disabled,
  onClick,
  ...props
}) {
  if (type === "success") {
    return (
      <SuccessButton
        {...props}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
      />
    );
  }

  return (
    <DefaultButton
      {...props}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    />
  );
});
