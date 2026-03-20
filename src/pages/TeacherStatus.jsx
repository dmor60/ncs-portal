import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applications";
import { getCurrentUserInfo } from "../utils/authHelpers";

function TeacherStatus() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const info = await getCurrentUserInfo();
      const userSub = info.user?.userId || info.user?.username;

      const apps = await getMyApplications(userSub);

      if (apps.length === 0) {
        setStatus("none");
      } else {
        setStatus(apps[0].status); // latest/first
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const renderMessage = () => {
    if (status === "loading") return "Checking your application...";
    if (status === "none") return "No application found.";

    if (status === "pending") {
      return "Your application is under review. We will get back to you ASAP.";
    }

    if (status === "accepted") {
      return "Congratulations! Your application has been accepted.";
    }

    if (status === "rejected") {
      return "Thank you for applying. Unfortunately, your application was not successful.";
    }

    return "Status unknown.";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Application Status</h1>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        {renderMessage()}
      </p>
    </div>
  );
}

export default TeacherStatus;