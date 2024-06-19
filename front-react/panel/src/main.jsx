import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StatePrincipalContext from './contexts/Principal.jsx';
import { theme } from "./structures/themes.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatePrincipalContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StatePrincipalContext>
  </React.StrictMode>
);
