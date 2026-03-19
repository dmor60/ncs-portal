import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { getCurrentUserInfo } from "../utils/authHelpers";

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const info = await getCurrentUserInfo();

      if (info.user) {
        setIsAuthenticated(true);
        setIsAdmin(info.isAdmin);
        setUsername(info.user.username || "");
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUsername("");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div style={{ marginBottom: "30px" }}>Loading menu...</div>;
  }

  return (
    <nav style={{ marginBottom: "30px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>

      {isAuthenticated && (
        <>
          <Link to="/student-application" style={{ marginRight: "15px" }}>
            Student Application
          </Link>

          <Link to="/teacher-application" style={{ marginRight: "15px" }}>
            Teacher Application
          </Link>
        </>
      )}

      {isAuthenticated && isAdmin && (
        <Link to="/teacher-application/admin" style={{ marginRight: "15px" }}>
          Admin Panel
        </Link>
      )}

      {!isAuthenticated ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <span style={{ marginRight: "15px" }}>
            Signed in as: <strong>{username}</strong>
          </span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;