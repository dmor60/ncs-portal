import { fetchAuthSession, fetchMFAPreference, getCurrentUser } from "aws-amplify/auth";

export async function getCurrentUserInfo() {
  try {
    const user = await getCurrentUser();
    console.log("DEBUG user:", user);

    const session = await fetchAuthSession();
    console.log("DEBUG session:", session);

    let mfa = null;
    try {
      mfa = await fetchMFAPreference();
      console.log("DEBUG mfa:", mfa);
    } catch (mfaError) {
      console.error("DEBUG fetchMFAPreference error:", mfaError);
    }

    const groups = session.tokens?.idToken?.payload?.["cognito:groups"] || [];
    console.log("DEBUG groups:", groups);

    return {
      user,
      groups,
      isAdmin: groups.includes("Admins"),
      mfaPreference: mfa?.preferred,
      mfaEnabled: !!(mfa?.preferred || mfa?.enabled?.length),
    };
  } catch (error) {
    console.error("DEBUG getCurrentUserInfo error:", error);

    return {
      user: null,
      groups: [],
      isAdmin: false,
      mfaPreference: null,
      mfaEnabled: false,
      error,
    };
  }
}