import React from "react";
import { LoginWidget } from "src/widgets/LoginWidget";
import { StyledLoginFormPage } from "./index";

export default function OnlyHooksVersion(): JSX.Element {
  return (
    <StyledLoginFormPage>
      <LoginWidget />
    </StyledLoginFormPage>
  );
}
