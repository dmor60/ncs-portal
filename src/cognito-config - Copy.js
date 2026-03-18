const isLocalhost = window.location.hostname === "localhost";

const cognitoConfig = {
  region: "us-east-1",
  userPoolId: "us-east-1_whaNcjxLh",
  userPoolWebClientId: "i6utfvpaqq2g4om2f5tpbkj1b",
  oauth: {
    domain: "us-east-1whancjxlh.auth.us-east-1.amazoncognito.com",
    scope: ["email", "openid"],
    redirectSignIn: isLocalhost
      ? "http://localhost:5173/login"
      : "https://main.d7l5a6qsx6h8h.amplifyapp.com/login",
    redirectSignOut: isLocalhost
      ? "http://localhost:5173/"
      : "https://main.d7l5a6qsx6h8h.amplifyapp.com/",
    responseType: "code",
  },
};

export default cognitoConfig;