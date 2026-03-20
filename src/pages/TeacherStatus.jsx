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
    return "#333";
  };

  const getStatusBackground = () => {
    if (status === "pending") return "#fff8e1";
    if (status === "accepted") return "#e8f5e9";
    if (status === "rejected") return "#ffebee";
    return "#f5f5f5";
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
    <div
      style={{
        maxWidth: "760px",
        margin: "60px auto",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "24px" }}>Application Status</h1>

        <div
          style={{
            display: "inline-block",
            background: getStatusBackground(),
            color: getStatusColor(),
            padding: "10px 18px",
            borderRadius: "999px",
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "24px",
          }}
        >
          Status: {renderStatusLabel()}
        </div>

        {application && (
          <div
            style={{
              marginTop: "10px",
              marginBottom: "24px",
              textAlign: "left",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <p style={{ margin: "0 0 10px 0" }}>
              <strong>Name:</strong> {application.fullName}
            </p>
            <p style={{ margin: "0 0 10px 0" }}>
              <strong>Email:</strong> {application.email}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Subject Area:</strong> {application.subjectArea}
            </p>
          </div>
        )}

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.6,
            margin: 0,
            color: "#374151",
          }}
        >
          {renderMessage()}
        </p>
      </div>
    </div>
  );
}

export default TeacherStatus;