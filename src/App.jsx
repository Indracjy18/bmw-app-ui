import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./Pages/dashboard.jsx";
import { LoginPage } from "./Pages/login.jsx";
import { KaryawanPage } from "./Pages/karyawan.jsx";
import { RegisterPage } from "./Pages/register.jsx";

// Komponen untuk Proteksi Rute (pastikan user sudah login)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div>
      <h1>APLIKASI INI BEKERJA!</h1>
      <Router>
        <Routes>
          {/* Rute Publik */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rute yang diproteksi (membutuhkan login) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/karyawan"
            element={
              <ProtectedRoute>
                <KaryawanPage />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<RegisterPage />} />
          {/* Rute Default saat pertama kali diakses */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* Fallback untuk rute tidak ditemukan (opsional, bisa ke halaman 404 atau redirect) */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
