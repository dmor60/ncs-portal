import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import StudentApplication from "./pages/StudentApplication";
import TeacherApplication from "./pages/TeacherApplication";
import Login from "./pages/Login";
import AuthCallback from "./components/Auth/AuthCallback";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: "30px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/student-application" style={{ marginRight: "15px" }}>
          Student Application
        </Link>
        <Link to="/teacher-application" style={{ marginRight: "15px" }}>
          Teacher Application
        </Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-application" element={<StudentApplication />} />
        <Route path="/teacher-application" element={<TeacherApplication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;