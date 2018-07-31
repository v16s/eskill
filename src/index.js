import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import './index.less'
import "./index.css";
import App from "./front/App";

const render = Component => {
  ReactDOM.render(
    <CookiesProvider>
        <Component />
    </CookiesProvider>,
    document.getElementById("root")
  );
};
render(App);
