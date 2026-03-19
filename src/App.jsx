import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentApplication from "./pages/StudentApplication";

import TeacherApplication from "./pages/TeacherApplication";
import TeacherApply from "./pages/TeacherApply";
import TeacherStatus from "./pages/TeacherStatus";
import TeacherAdmin from "./pages/TeacherAdmin";

import Login from "./pages/Login";
import AuthCallback from "./components/Auth/AuthCallback";
import AdminSetupMfa from "./pages/AdminSetupMfa";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/student-application"
          element={
            <ProtectedRoute>
              <StudentApplication />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-application"
          element={
            <ProtectedRoute>
              <TeacherApplication />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-application/apply"
          element={
            <ProtectedRoute>
              <TeacherApply />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-application/status"
          element={
            <ProtectedRoute>
              <TeacherStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-application/admin"
          element={
            <AdminRoute>
              <TeacherAdmin />
            </AdminRoute>
          }
        />

        <Route path="/admin/setup-mfa" element={<AdminSetupMfa />} />
      </Routes>
    </div>
  );
}

export default App;