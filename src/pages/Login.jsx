import { signInWithRedirect } from "aws-amplify/auth";

function Login() {
  const handleLogin = async () => {
    try {
      await signInWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check console.");
    }
  };

  return (
    <div>
      <h1>NCS Portal Login</h1>
      <button onClick={handleLogin}>Login with Cognito</button>
    </div>
  );
}

export default Login;