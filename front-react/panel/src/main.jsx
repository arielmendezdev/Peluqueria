import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/index.css";
import StatePrincipalContext from './contexts/Principal.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatePrincipalContext>
      <App />
    </StatePrincipalContext>
  </React.StrictMode>
);
