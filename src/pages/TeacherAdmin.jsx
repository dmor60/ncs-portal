import { useEffect, useMemo, useState } from "react";
import { getApplications, updateApplication } from "../api/applications";
import { getCurrentUserInfo } from "../utils/authHelpers";

function TeacherAdmin() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applications:", error);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      const info = await getCurrentUserInfo();
      const reviewedBy = info.email || info.user?.username || "admin";

      await updateApplication(id, status, reviewedBy);
      await loadApplications();
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  const teacherApplications = useMemo(() => {
    return applications.filter(
      (app) => (app.applicationType || "").toLowerCase() === "teacher"
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

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Review and manage teacher applications.</p>

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

      <div style={{ marginTop: "30px" }}>
        <h2>Teacher Applications</h2>

        {teacherApplications.length === 0 ? (
          <p>No teacher applications found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Name</th>
                <th style={thtdStyle}>Email</th>
                <th style={thtdStyle}>Subject</th>
                <th style={thtdStyle}>Status</th>
                <th style={thtdStyle}>Submitted</th>
                <th style={thtdStyle}>Reviewed</th>
                <th style={thtdStyle}>Reviewed By</th>
                <th style={thtdStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teacherApplications.map((app) => (
                <tr key={app.applicationid}>
                  <td style={thtdStyle}>{app.fullName || ""}</td>
                  <td style={thtdStyle}>{app.email || ""}</td>
                  <td style={thtdStyle}>{app.subjectArea || ""}</td>
                  <td style={thtdStyle}>{app.status || ""}</td>
                  <td style={thtdStyle}>{app.submittedAt || ""}</td>
                  <td style={thtdStyle}>{app.reviewedAt || ""}</td>
                  <td style={thtdStyle}>{app.reviewedBy || ""}</td>
                  <td style={thtdStyle}>
                    <button
                      onClick={() => handleUpdate(app.applicationid, "accepted")}
                      style={{ marginRight: "8px" }}
                    >
                      Accept
                    </button>
                    <button onClick={() => handleUpdate(app.applicationid, "rejected")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeacherAdmin;