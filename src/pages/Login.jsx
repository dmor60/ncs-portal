import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, signOut } from "aws-amplify/auth";
import { getCurrentUserInfo } from "../utils/authHelpers";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const info = await getCurrentUserInfo();

      if (info.user) {
        setUser(info.user);

        if (info.isAdmin) {
          navigate("/teacher-application/admin", { replace: true });
        } else {
          navigate("/teacher-application/status", { replace: true });
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    const clientId = "i6utfvpaqq2g4om2f5tpbkj1b";
    const logoutUri = encodeURIComponent("https://psp.ncs.edu.bs/");

    try {
      await signOut({ global: true });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href =
        `https://us-east-1whancjxlh.auth.us-east-1.amazoncognito.com/logout` +
        `?client_id=${clientId}&logout_uri=${logoutUri}`;
    }
  };

  return (
    <div>
      <h1>NCS Portal Login</h1>

      {user ? (
        <div>
          <p>Signed in.</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login to NCS</button>
      )}
    </div>
  );
}

export default Login;