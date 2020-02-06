import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from './App'
import { LocaleProvider } from "antd";
console.log(process.env.BASE_API)
ReactDOM.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);