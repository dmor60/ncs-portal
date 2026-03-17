import { useEffect, useState } from "react";
import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check console.");
    }
  };

  const handleLogout = () => {
    const clientId = "i6utfvpaqq2g4om2f5tpbkj1b";
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain = "https://us-east-1whancjxlh.auth.us-east-1.amazoncognito.com";

    window.location.href =
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  return (
    <div>
      <h1>NCS Portal Login</h1>

      {user ? (
        <div>
          <p>Signed in as: {user.username}</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Cognito</button>
      )}
    </div>
  );
}

export default Login;