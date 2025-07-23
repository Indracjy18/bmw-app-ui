import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/login";
import { KaryawanPage } from "./Pages/karyawan";
import { Dashboard } from "./Pages/dashboard";
import { FormRegister } from "./components/Fragments/FormRegister";
import { RegisterPage } from "./Pages/register";

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
  );
}

export default App;
