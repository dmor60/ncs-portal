import { fetchAuthSession, fetchMFAPreference, getCurrentUser } from "aws-amplify/auth";

export async function getCurrentUserInfo() {
  try {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();

    let mfa = null;
    try {
      mfa = await fetchMFAPreference();
    } catch (mfaError) {
      console.error("fetchMFAPreference error:", mfaError);
    }

    const groups = session.tokens?.idToken?.payload?.["cognito:groups"] || [];
    const email =
      session.tokens?.idToken?.payload?.email ||
      session.tokens?.accessToken?.payload?.username ||
      user?.signInDetails?.loginId ||
      user?.username ||
      "";

    return {
      user,
      email,
      groups,
      isAdmin: groups.includes("Admins"),
      mfaPreference: mfa?.preferred,
      mfaEnabled: !!(mfa?.preferred || mfa?.enabled?.length),
    };
  } catch (error) {
    return {
      user: null,
      email: "",
      groups: [],
      isAdmin: false,
      mfaPreference: null,
      mfaEnabled: false,
      error,
    };
  }
}