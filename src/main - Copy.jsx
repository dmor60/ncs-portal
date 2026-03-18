import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import App from "./App.jsx";
import cognitoConfig from "./cognito-config";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolWebClientId,
      loginWith: {
        oauth: {
          domain: cognitoConfig.oauth.domain,
          scopes: cognitoConfig.oauth.scope,
          redirectSignIn: [cognitoConfig.oauth.redirectSignIn],
          redirectSignOut: [cognitoConfig.oauth.redirectSignOut],
          responseType: cognitoConfig.oauth.responseType,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);