import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserInfo } from "../../utils/authHelpers";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const info = await getCurrentUserInfo();

        if (info.isAdmin) {
          navigate("/teacher-application/admin", { replace: true });
        } else {
          navigate("/teacher-application/status", { replace: true });
        }
      } catch (error) {
        console.error("Auth callback failed:", error);
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div>
      <h1>Signing you in...</h1>
      <p>Please wait.</p>
    </div>
  );
}

export default AuthCallback;