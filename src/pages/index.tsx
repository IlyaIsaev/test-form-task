import Link from "next/link";
import React from "react";
import styled from "styled-components";

export const StyledLoginFormPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Home(): JSX.Element {
  return (
    <StyledLoginFormPage>
      <Link href="/only-hooks-version">
        <a>Only hooks version</a>
      </Link>
      &nbsp; &nbsp; &nbsp;
      <Link href="/redux-version">
        <a>Redux version</a>
      </Link>
    </StyledLoginFormPage>
  );
}
