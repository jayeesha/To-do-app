import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import FormDataProvider from "./store/FormDataContext";
import store from "./store/index";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FormDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FormDataProvider>
    </Provider>
  </React.StrictMode>
);
