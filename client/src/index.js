import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/Login";
import { CenteredContainer } from "./components/Container";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CenteredContainer>
      <Login />
    </CenteredContainer>
  </React.StrictMode>
);
