import { useEffect, useState } from "react";
import { getApplications, updateApplication } from "../api/applications";

function TeacherAdmin() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  const handleUpdate = async (id, status) => {
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
            <tr key={app.applicationId}>
              <td>{app.fullName}</td>
              <td>{app.email}</td>
              <td>{app.subjectArea}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleUpdate(app.applicationId, "accepted")}>
                  Accept
                </button>
                <button onClick={() => handleUpdate(app.applicationId, "rejected")}>
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