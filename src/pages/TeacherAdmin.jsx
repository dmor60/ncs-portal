import { useEffect, useMemo, useState } from "react";
import { getApplications, updateApplication } from "../api/applications";

function TeacherAdmin() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getApplications();
      console.log("Loaded applications:", data);
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applications:", error);
    }
  };

  const handleUpdate = async (id, status) => {
    console.log("Updating application:", id, status);
    await updateApplication(id, status);
    await loadApplications();
  };

  const teacherApplications = useMemo(() => {
    return applications.filter(
      (app) => (app.applicationType || "").toLowerCase() === "teacher"
    );
  }, [applications]);

  const studentApplications = useMemo(() => {
    return applications.filter(
      (app) => (app.applicationType || "").toLowerCase() === "student"
    );
  }, [applications]);

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((app) => app.status === "pending").length;
    const accepted = applications.filter((app) => app.status === "accepted").length;
    const rejected = applications.filter((app) => app.status === "rejected").length;

    return { total, pending, accepted, rejected };
  }, [applications]);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "18px",
    background: "#fff",
  };

  const sectionStyle = {
    marginTop: "30px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  };

  const thtdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
    verticalAlign: "top",
  };

  const renderTable = (rows, typeLabel) => {
    return (
      <div style={sectionStyle}>
        <h2>{typeLabel}</h2>

        {rows.length === 0 ? (
          <p>No {typeLabel.toLowerCase()} found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Name</th>
                <th style={thtdStyle}>Email</th>
                <th style={thtdStyle}>Subject</th>
                <th style={thtdStyle}>Status</th>
                <th style={thtdStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((app) => (
                <tr key={app.applicationid}>
                  <td style={thtdStyle}>{app.fullName || ""}</td>
                  <td style={thtdStyle}>{app.email || ""}</td>
                  <td style={thtdStyle}>{app.subjectArea || ""}</td>
                  <td style={thtdStyle}>{app.status || ""}</td>
                  <td style={thtdStyle}>
                    <button
                      onClick={() => handleUpdate(app.applicationid, "accepted")}
                      style={{ marginRight: "8px" }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdate(app.applicationid, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Review and manage teacher and student applications.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Applications</h3>
          <p style={{ fontSize: "28px", margin: 0 }}>{stats.total}</p>
        </div>

        <div style={cardStyle}>
          <h3>Pending</h3>
          <p style={{ fontSize: "28px", margin: 0 }}>{stats.pending}</p>
        </div>

        <div style={cardStyle}>
          <h3>Accepted</h3>
          <p style={{ fontSize: "28px", margin: 0 }}>{stats.accepted}</p>
        </div>

        <div style={cardStyle}>
          <h3>Rejected</h3>
          <p style={{ fontSize: "28px", margin: 0 }}>{stats.rejected}</p>
        </div>
      </div>

      {renderTable(teacherApplications, "Teacher Applications")}
      {renderTable(studentApplications, "Student Applications")}
    </div>
  );
}

export default TeacherAdmin;