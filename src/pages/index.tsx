import Link from "next/link";
import React from "react";
import { Button } from "src/components/Button";
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
        <Button type="success">Only hooks version</Button>
      </Link>
      &nbsp; &nbsp; &nbsp;
      <Link href="/redux-version">
        <Button type="success">Redux version</Button>
      </Link>
    </StyledLoginFormPage>
  );
}
