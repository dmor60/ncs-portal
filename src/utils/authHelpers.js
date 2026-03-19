import { fetchAuthSession, fetchMFAPreference, getCurrentUser } from "aws-amplify/auth";

export async function getCurrentUserInfo() {
  try {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();
    const mfa = await fetchMFAPreference();

    const groups = session.tokens?.idToken?.payload?.["cognito:groups"] || [];

    return {
      user,
      groups,
      isAdmin: groups.includes("Admins"),
      mfaPreference: mfa?.preferred,
      mfaEnabled: !!(mfa?.preferred || mfa?.enabled?.length),
    };
  } catch (error) {
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