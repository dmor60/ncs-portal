import { useState } from "react";
import { createApplication } from "../api/applications";

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
    console.log("Submit clicked");
    console.log("Form data:", form);

    setSubmitting(true);
    setMessage("");

    try {
      const result = await createApplication({
        ...form,
        applicationType: "teacher",
      });

      console.log("API result:", result);
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

      {message && (
        <p style={{ marginTop: "12px" }}>
          {message}
        </p>
      )}
    </form>
  );
}

export default TeacherApply;