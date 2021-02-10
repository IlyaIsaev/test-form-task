import React from "react";
import styled from "styled-components";
import { LoginForm } from "src/widgets/LoginForm";

const StyledLoginFormPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Home() {
  return (
    <StyledLoginFormPage>
      <LoginForm />
    </StyledLoginFormPage>
  );
}
