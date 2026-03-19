import { Link } from "react-router-dom";

function TeacherApplication() {
  return (
    <div>
      <h1>Teacher Application</h1>
      <p>Please choose an option below.</p>

      <div style={{ marginTop: "20px" }}>
        <p>
          <Link to="/teacher-application/apply">Apply as a Teacher</Link>
        </p>
        <p>
          <Link to="/teacher-application/status">Check Application Status</Link>
        </p>
        <p>
          <Link to="/teacher-application/admin">Admin Review Panel</Link>
        </p>
      </div>
    </div>
  );
}

export default TeacherApplication;