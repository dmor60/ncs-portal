import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import AuthCallback from "./AuthCallback";

function Home() {
  return (
    <div>
      <h1>NCS Portal</h1>
      <p>Welcome to the NCS Application Portal</p>
    </div>
  );
}

function StudentApplication() {
  return <div>Student Application</div>;
}

function TeacherApplication() {
  return <div>Teacher Application</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/student-application" element={<StudentApplication />} />
      <Route path="/teacher-application" element={<TeacherApplication />} />
    </Routes>
  );
}