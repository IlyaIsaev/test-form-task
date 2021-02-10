import React from "react";
import styled from "styled-components";
import { LoginWidget } from "src/widgets/LoginWidget";

const StyledLoginFormPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Home(): JSX.Element {
  return (
    <StyledLoginFormPage>
      <LoginWidget />
    </StyledLoginFormPage>
  );
}
