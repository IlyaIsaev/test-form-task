import { transparentize, triangle } from "polished";
import React, { FC, memo } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => transparentize(0.3, theme.colors.dark)};
`;

const StyledFormGroup = styled.div`
  width: 100%;
  position: relative;

  & + & {
    margin: 10px 0 0;
  }
`;

const StyledError = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => transparentize(0.1, theme.colors.danger)};
  border-radius: 3px;
  padding: 10px 20px;
  z-index: 100;
  font-size: 14px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.light};
  white-space: nowrap;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);

    ${({ theme }) =>
      triangle({
        pointingDirection: "top",
        width: "15px",
        height: "5px",
        foregroundColor: transparentize(0.1, theme.colors.danger),
      })}
  }
`;

const StyledErrorAnimation = styled(CSSTransition)`
  &.enter {
    opacity: 0;
  }

  &.enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  &.exit {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

const StyledErrorSign = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export interface FormGroupProps {
  label: string;
  valid?: boolean;
  error?: string;
}

export const FormGroup: FC<FormGroupProps> = memo(function FormGroup({
  label,
  error,
  valid,
  children,
}) {
  return (
    <StyledFormGroup>
      <StyledLabel>
        {label} {error && <StyledErrorSign>*</StyledErrorSign>}
      </StyledLabel>
      {children}
      <StyledErrorAnimation
        in={valid === false}
        timeout={200}
        unmountOnExit
        mountOnEnter
      >
        <StyledError>{error}</StyledError>
      </StyledErrorAnimation>
    </StyledFormGroup>
  );
});
