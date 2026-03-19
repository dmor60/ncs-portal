import { useEffect, useState } from "react";
import {
  setUpTOTP,
  verifyTOTPSetup,
  updateMFAPreference,
} from "aws-amplify/auth";

function AdminSetupMfa() {
  const [setupUri, setSetupUri] = useState("");
  const [sharedSecret, setSharedSecret] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("Preparing MFA setup...");
  const [error, setError] = useState("");

  useEffect(() => {
    const startSetup = async () => {
      try {
        setError("");
        const details = await setUpTOTP();
        const uri = details.getSetupUri("NCS PSP");
        setSetupUri(uri);
        setSharedSecret(details.sharedSecret);
        setMessage("Scan the QR in your authenticator app, then enter the 6-digit code.");
      } catch (err) {
        console.error(err);
        setError("Could not start TOTP setup.");
        setMessage("");
      }
    };

    startSetup();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await verifyTOTPSetup({ code });

      await updateMFAPreference({
        totp: "PREFERRED",
      });

      window.location.href = "/teacher-application";
    } catch (err) {
      console.error(err);
      setError("Invalid code or MFA setup failed. Try a fresh code.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "520px" }}>
      <h1>Admin MFA Required</h1>
      <p>{message}</p>

      {setupUri && (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            Open this on a device with your authenticator app, or use the secret key manually.
          </p>
          <a href={setupUri}>Open authenticator setup</a>
        </div>
      )}

      {sharedSecret && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Secret key:</strong>
          <div style={{ wordBreak: "break-all" }}>{sharedSecret}</div>
        </div>
      )}

      <form onSubmit={handleVerify}>
        <label htmlFor="totp-code">Enter 6-digit code</label>
        <input
          id="totp-code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          maxLength={6}
          style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
        />
        <button type="submit">Verify MFA</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}

export default AdminSetupMfa;