import React from "react";
import { LoginWidgetRedux, store } from "src/widgets/LoginWidgetRedux";
import { StyledLoginFormPage } from "./index";
import { Provider } from "react-redux";

export default function ReduxVersion(): JSX.Element {
  return (
    <StyledLoginFormPage>
      <Provider store={store}>
        <LoginWidgetRedux />
      </Provider>
    </StyledLoginFormPage>
  );
}
