import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication, getMyApplications } from "../api/applications";
import { getCurrentUserInfo } from "../utils/authHelpers";

function TeacherApply() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subjectArea: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const goBackToHome = () => {
    setTimeout(() => {
      navigate("/teacher-application", { replace: true });
    }, 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const info = await getCurrentUserInfo();
      const userSub = info.user?.userId || info.user?.username || info.email;

      const myApps = await getMyApplications(userSub);
      const hasPending = myApps.some((app) => app.status === "pending");

      if (hasPending) {
        setMessage("Application denied. You already have an application pending review.");
        setMessageType("warning");
        goBackToHome();
        setSubmitting(false);
        return;
      }

      const payload = {
        ...form,
        applicationType: "teacher",
        submittedBy: userSub,
      };

      const result = await createApplication(payload);

      setMessage(result.message || "Application submitted successfully.");
      setMessageType("success");
      setForm({
        fullName: "",
        email: "",
        subjectArea: "",
      });

      goBackToHome();
    } catch (error) {
      console.error("Submit error:", error);
      setMessage(error.message || "Submission failed.");
      setMessageType("error");
      goBackToHome();
    } finally {
      setSubmitting(false);
    }
  };

  const containerStyle = {
    maxWidth: "560px",
    margin: "30px auto",
    padding: "16px",
  };

  const cardStyle = {
    background: "linear-gradient(180deg, #fffdf8 0%, #f8f4ea 100%)",
    border: "1px solid #d9c9a3",
    borderRadius: "16px",
    padding: "26px",
    boxShadow: "0 8px 20px rgba(50, 40, 20, 0.08)",
  };

  const titleStyle = {
    marginTop: 0,
    marginBottom: "8px",
    color: "#1f3a2d",
    fontSize: "24px",
    fontWeight: "700",
  };

  const subtitleStyle = {
    marginTop: 0,
    marginBottom: "20px",
    color: "#5d4b2f",
    fontSize: "14px",
    lineHeight: 1.6,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "700",
    color: "#1f3a2d",
    fontSize: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbb98e",
    borderRadius: "10px",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#fffefb",
    color: "#1f2937",
  };

  const buttonStyle = {
    padding: "11px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#1f3a2d",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: submitting ? "not-allowed" : "pointer",
    opacity: submitting ? 0.7 : 1,
    boxShadow: "0 4px 12px rgba(31, 58, 45, 0.18)",
  };

  const getMessageStyle = () => {
    if (messageType === "success") {
      return {
        marginTop: "16px",
        background: "#ecfdf3",
        color: "#166534",
        border: "1px solid #a7f3d0",
        padding: "10px 12px",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "14px",
      };
    }

    if (messageType === "warning") {
      return {
        marginTop: "16px",
        background: "#fffbeb",
        color: "#92400e",
        border: "1px solid #fcd34d",
        padding: "10px 12px",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "14px",
      };
    }

    return {
      marginTop: "16px",
      background: "#fef2f2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      padding: "10px 12px",
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
    };
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Teacher Application</h1>
        <p style={subtitleStyle}>
          Please complete the form below carefully. All submissions are reviewed
          before a final decision is made.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="fullName" style={labelStyle}>
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="email" style={labelStyle}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="subjectArea" style={labelStyle}>
              Subject Area
            </label>
            <input
              id="subjectArea"
              type="text"
              value={form.subjectArea}
              onChange={(e) => setForm({ ...form, subjectArea: e.target.value })}
              style={inputStyle}
            />
          </div>

          <button type="submit" disabled={submitting} style={buttonStyle}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {message && <div style={getMessageStyle()}>{message}</div>}
      </div>
    </div>
  );
}

export default TeacherApply;
