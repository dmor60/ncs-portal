import { useEffect, useState } from "react";
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

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.applicationid}>
              <td>{app.fullName || ""}</td>
              <td>{app.email || ""}</td>
              <td>{app.subjectArea || ""}</td>
              <td>{app.status || ""}</td>
              <td>
                <button onClick={() => handleUpdate(app.applicationid, "accepted")}>
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
    </div>
  );
}

export default TeacherAdmin;