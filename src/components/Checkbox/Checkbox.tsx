import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";
import { CheckIcon } from "src/components/Icon";

const StyledCheckIcon = styled(CheckIcon)`
  fill: ${({ theme }) => theme.colors.light};
`;

const StyledLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

const StyledAction = styled.label<CheckboxProps & { changeable: boolean }>`
  width: 15px;
  height: 15px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primaryLight : theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 2px;
  margin: 0 7px 0 0;
  transition: all 0.2s ease-out 0s;
  cursor: ${({ changeable }) => (changeable ? "pointer" : "default")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckbox = styled.label<CheckboxProps & { changeable: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryLight};
  transition: all 0.2s ease-out 0s;
  cursor: ${({ changeable }) => (changeable ? "pointer" : "default")};

  ${({ theme, checked, changeable }) => {
    if (!changeable) {
      return `
        cursor: default;
      `;
    }

    return `
      &:hover {
        color: ${theme.colors.primary};

        ${StyledAction} {
          background: ${checked ? theme.colors.primary : theme.colors.light};
          border: 1px solid ${theme.colors.primary};
        }
      }
    `;
  }}
`;

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = memo(function Checkbox({
  label,
  checked,
  onChange,
}) {
  const handleChange = useCallback(() => {
    if (onChange) {
      onChange(!checked);
    }
  }, [checked, onChange]);

  const changeable = Boolean(onChange);

  return (
    <StyledCheckbox
      checked={checked}
      changeable={changeable}
      onClick={handleChange}
    >
      <StyledAction checked={checked} changeable={changeable}>
        <StyledCheckIcon />
      </StyledAction>
      {label && <StyledLabel>{label}</StyledLabel>}
    </StyledCheckbox>
  );
});
