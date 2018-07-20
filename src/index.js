import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./front/App";
import { AragonApp } from "@aragon/ui";
import registerServiceWorker from "./registerServiceWorker";

const render = Component => {
  ReactDOM.render(
    <CookiesProvider>
      <AragonApp publicUrl="/aragon-ui-assets/">
        <Component />
      </AragonApp>
    </CookiesProvider>,
    document.getElementById("root")
  );
};
render(App);
registerServiceWorker();
