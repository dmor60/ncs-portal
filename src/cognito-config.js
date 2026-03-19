const host = window.location.origin;

const cognitoConfig = {
  region: "us-east-1",
  userPoolId: "us-east-1_whaNcjxLh",
  userPoolWebClientId: "i6utfvpaqq2g4om2f5tpbkj1b",
  oauth: {
    domain: "us-east-1whancjxlh.auth.us-east-1.amazoncognito.com",
    scope: ["email", "openid"],
    redirectSignIn: `${host}/auth/callback`,   // ✅ FIXED
    redirectSignOut: `${host}/`,
    responseType: "code",
  },
};

export default cognitoConfig;