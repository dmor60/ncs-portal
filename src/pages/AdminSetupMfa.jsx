import { useEffect, useRef, useState } from "react";
import {
  setUpTOTP,
  verifyTOTPSetup,
  updateMFAPreference,
} from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function AdminSetupMfa() {
  const [setupUri, setSetupUri] = useState("");
  const [sharedSecret, setSharedSecret] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Preparing MFA setup...");
  const navigate = useNavigate();
  const startedRef = useRef(false);

  useEffect(() => {
    const startSetup = async () => {
      if (startedRef.current) return;
      startedRef.current = true;

      try {
        setError("");

        const details = await setUpTOTP();
        const uri = details.getSetupUri("NCS PSP");

        setSetupUri(uri.toString()); // important
        setSharedSecret(details.sharedSecret || "");
        setStatus(
          "Scan the setup link with your authenticator app or enter the secret manually, then type the 6-digit code."
        );
      } catch (err) {
        console.error("setUpTOTP failed:", err);
        setError("Could not start TOTP setup.");
        setStatus("");
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

      navigate("/teacher-application", { replace: true });
    } catch (err) {
      console.error("verifyTOTPSetup failed:", err);
      setError("Invalid code or MFA setup failed. Wait for a fresh code and try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "560px" }}>
      <h1>Administrator MFA Required</h1>
      <p>{status}</p>

      {setupUri && (
        <div style={{ marginBottom: "1rem" }}>
          <p>Open this link with your authenticator app:</p>
          <a href={setupUri}>{setupUri}</a>
        </div>
      )}

      {sharedSecret && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Manual secret key:</strong>
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
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
          }}
        />
        <button type="submit">Verify MFA</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}

export default AdminSetupMfa;