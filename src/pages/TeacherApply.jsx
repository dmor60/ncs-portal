import { useState } from "react";
import { createApplication } from "../api/applications";

function TeacherApply() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subjectArea: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createApplication({
      ...form,
      applicationType: "teacher",
    });

    console.log("Submitted:", result);
    alert("Application submitted!");
    setForm({
      fullName: "",
      email: "",
      subjectArea: "",
    });
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

      <button type="submit">Apply</button>
    </form>
  );
}

export default TeacherApply;