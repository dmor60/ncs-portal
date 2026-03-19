import { signInWithRedirect } from "aws-amplify/auth";

function AdminSetupMfa() {
  const handleSetupMfa = async () => {
    try {
      await signInWithRedirect();
    } catch (error) {
      console.error("Failed to start MFA setup:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Administrator MFA Required</h1>
      <p>
        Your account is in the Admins group. You must complete MFA setup before
        accessing administrative pages.
      </p>
      <button onClick={handleSetupMfa}>Set up MFA now</button>
    </div>
  );
}

export default AdminSetupMfa;