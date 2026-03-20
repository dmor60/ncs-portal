import { useState } from "react";
import { createApplication } from "../api/applications";
import { getCurrentUserInfo } from "../utils/authHelpers";

function TeacherApply() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subjectArea: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const info = await getCurrentUserInfo();

      const payload = {
        ...form,
        applicationType: "teacher",
        submittedBy: info.user?.userId || info.user?.username || info.email,
      };

      const result = await createApplication(payload);
      console.log("Submitted:", result);

      setMessage("Application submitted successfully.");
      setForm({
        fullName: "",
        email: "",
        subjectArea: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("Submission failed. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <h1>Teacher Application</h1>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="fullName" style={{ display: "block", marginBottom: "6px" }}>
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "6px" }}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="subjectArea" style={{ display: "block", marginBottom: "6px" }}>
          Subject Area
        </label>
        <input
          id="subjectArea"
          type="text"
          value={form.subjectArea}
          onChange={(e) => setForm({ ...form, subjectArea: e.target.value })}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Apply"}
      </button>

      {message && <p style={{ marginTop: "12px" }}>{message}</p>}
    </form>
  );
}

export default TeacherApply;