import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
);
