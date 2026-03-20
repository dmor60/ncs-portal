import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applications";
import { getCurrentUserInfo } from "../utils/authHelpers";

function TeacherStatus() {
  const [status, setStatus] = useState("loading");
  const [application, setApplication] = useState(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const info = await getCurrentUserInfo();
      const userSub = info.user?.userId || info.user?.username || info.email;

      const apps = await getMyApplications(userSub);

      if (apps.length === 0) {
        setStatus("none");
        setApplication(null);
      } else {
        const latestApp = apps[apps.length - 1];
        setApplication(latestApp);
        setStatus(latestApp.status || "pending");
      }
    } catch (error) {
      console.error("Status load error:", error);
      setStatus("error");
      setApplication(null);
    }
  };

  const getStatusColor = () => {
    if (status === "pending") return "#b8860b";
    if (status === "accepted") return "green";
    if (status === "rejected") return "crimson";
    return "black";
  };

  const renderMessage = () => {
    if (status === "loading") return "Checking your application...";
    if (status === "none") return "No application found.";
    if (status === "pending") {
      return "Your application is under review. We will contact you as soon as possible.";
    }
    if (status === "accepted") {
      return "Congratulations. Your application has been accepted.";
    }
    if (status === "rejected") {
      return "Thank you for applying. Unfortunately, your application was not successful.";
    }
    if (status === "error") {
      return "There was a problem checking your application.";
    }
    return "Status unknown.";
  };

  const renderStatusLabel = () => {
    if (status === "loading") return "Loading";
    if (status === "none") return "No Application";
    if (status === "pending") return "Pending";
    if (status === "accepted") return "Accepted";
    if (status === "rejected") return "Rejected";
    if (status === "error") return "Error";
    return "Unknown";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Application Status</h1>

      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        <strong>Status: </strong>
        <span style={{ color: getStatusColor(), fontWeight: "bold" }}>
          {renderStatusLabel()}
        </span>
      </p>

      {application && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Name:</strong> {application.fullName}
          </p>
          <p>
            <strong>Email:</strong> {application.email}
          </p>
          <p>
            <strong>Subject Area:</strong> {application.subjectArea}
          </p>
        </div>
      )}

      <p style={{ fontSize: "18px", marginTop: "20px" }}>{renderMessage()}</p>
    </div>
  );
}

export default TeacherStatus;