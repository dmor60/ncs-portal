import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import StudentApplication from "./pages/StudentApplication";
import TeacherApplication from "./pages/TeacherApplication";
import Login from "./pages/Login";
import AuthCallback from "./components/Auth/AuthCallback";

// NEW imports
import AdminRoute from "./components/Auth/AdminRoute";
import AdminSetupMfa from "./pages/AdminSetupMfa";

// (example admin page - use your real one if different)


function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: "30px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>

        {/* PUBLIC */}
        <Link to="/student-application" style={{ marginRight: "15px" }}>
          Student Application
        </Link>

        {/* ADMIN ONLY */}
        <Link to="/teacher-application" style={{ marginRight: "15px" }}>
          Teacher Application
        </Link>

        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* PUBLIC ROUTE */}
        <Route path="/student-application" element={<StudentApplication />} />

        {/* ADMIN PROTECTED ROUTE */}
        <Route
          path="/teacher-application"
          element={
            <AdminRoute>
              <TeacherApplication />
            </AdminRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* MFA SETUP PAGE */}
        <Route path="/admin/setup-mfa" element={<AdminSetupMfa />} />
      </Routes>
    </div>
  );
}

export default App;