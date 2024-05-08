import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
 
  <Auth0Provider
    domain="dev-eu6t4ir5rxlf4hwu.us.auth0.com"
    clientId="ZGMz06hOzBbQ60T0Zi7L7RLqjodzfZGB"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AppProvider>
      <App />
    </AppProvider>
  </Auth0Provider> 
  
);
