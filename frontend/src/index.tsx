import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ "client-id": "test" }}
        >
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
