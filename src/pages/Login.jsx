import { useEffect, useState } from "react";
import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogin = async () => {
    await signInWithRedirect();
  };

  const handleLogout = async () => {
    await signOut({ global: true });
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