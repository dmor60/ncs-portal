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
    <form onSubmit={handleSubmit}>
      <h1>Teacher Application</h1>

      <div style={{ marginBottom: "12px" }}>
        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <input
          placeholder="Subject Area"
          value={form.subjectArea}
          onChange={(e) => setForm({ ...form, subjectArea: e.target.value })}
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