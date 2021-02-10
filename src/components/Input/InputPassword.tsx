import { transparentize } from "polished";
import { FC, memo, useCallback, useState } from "react";
import styled from "styled-components";
import { StyledInput, InputDefaultProps } from "./InputDefault";

const StyledInputPassword = styled.div`
  position: relative;
`;

const StyledShowPassButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  z-index: 2;
  font-size: 14px;
  color: ${({ theme }) => transparentize(0.5, theme.colors.dark)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-out 0s;

  &:hover {
    color: ${({ theme }) => theme.colors.dark};
  }

  &:active {
    color: ${({ theme }) => theme.colors.dark};
  }

  span {
    border-bottom: 1px dashed;
  }
`;

const StyledInputComponent = styled(StyledInput)`
  padding-right: 60px;
  position: relative;
  z-index: 1;
`;

export type InputPasswordProps = Omit<InputDefaultProps, "type">;

export const InputPassword: FC<InputPasswordProps> = memo(
  function InputPassword({ value, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordClick = useCallback(() => {
      setShowPassword((prevValue) => !prevValue);
    }, []);

    return (
      <StyledInputPassword>
        <StyledInputComponent
          value={value}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        {value && (
          <StyledShowPassButton onClick={handleShowPasswordClick}>
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </StyledShowPassButton>
        )}
      </StyledInputPassword>
    );
  }
);
