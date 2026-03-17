const cognitoConfig = {
  region: "us-east-1",
  userPoolId: "us-east-1_whaNcjxLh",
  userPoolWebClientId: "i6utfvpaqq2g4om2f5tpbkj1b",
  oauth: {
    domain: "us-east-1whancjxlh.auth.us-east-1.amazoncognito.com",
    scope: ["email", "openid", "profile"],
    redirectSignIn: "http://localhost:5173/auth/callback",
    redirectSignOut: "http://localhost:5173",
    responseType: "code",
  },
};

export default cognitoConfig;