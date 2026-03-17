import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await getCurrentUser();
        navigate("/login", { replace: true });
      } catch {
        setTimeout(async () => {
          try {
            await getCurrentUser();
            navigate("/login", { replace: true });
          } catch {
            navigate("/login", { replace: true });
          }
        }, 1000);
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