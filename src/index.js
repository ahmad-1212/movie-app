import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MovieContextProivder } from "./context/movieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieContextProivder>
        <App />
      </MovieContextProivder>
    </BrowserRouter>
  </React.StrictMode>
);
