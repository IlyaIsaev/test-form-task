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

const StyledAction = styled.label<{ checked: boolean }>`
  width: 15px;
  height: 15px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primaryLight : theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 2px;
  margin: 0 7px 0 0;
  transition: all 0.2s ease-out 0s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckbox = styled.label<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryLight};
  transition: all 0.2s ease-out 0s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    ${StyledAction} {
      background: ${({ checked, theme }) =>
        checked ? theme.colors.primary : theme.colors.light};
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = memo(function Checkbox({
  label,
  checked,
  onChange,
}) {
  const handleChange = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <StyledCheckbox checked={checked}>
      <StyledAction checked={checked} onClick={handleChange}>
        <StyledCheckIcon />
      </StyledAction>

      {label && <StyledLabel>{label}</StyledLabel>}
    </StyledCheckbox>
  );
});
