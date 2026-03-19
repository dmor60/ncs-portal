import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUserInfo } from "../../utils/authHelpers";

function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const checkAccess = async () => {
      const info = await getCurrentUserInfo();

      if (!info.user) {
        setStatus("not-logged-in");
        return;
      }

      if (!info.isAdmin) {
        setStatus("not-admin");
        return;
      }

      if (!info.mfaEnabled) {
        setStatus("admin-no-mfa");
        return;
      }

      setStatus("allowed");
    };

    checkAccess();
  }, []);

  if (status === "loading") {
    return <div>Checking access...</div>;
  }

  if (status === "not-logged-in") {
    return <Navigate to="/login" replace />;
  }

  if (status === "not-admin") {
    return <Navigate to="/" replace />;
  }

  if (status === "admin-no-mfa") {
    return <Navigate to="/admin/setup-mfa" replace />;
  }

  return children;
}

export default AdminRoute;