import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-center" // Posisi notifikasi (bisa 'top-left', 'top-center', 'bottom-right', dll.)
      autoClose={1000} // Notifikasi akan hilang setelah 5 detik (dalam ms)
      hideProgressBar={false} // Tampilkan progress bar waktu notifikasi
      newestOnTop={false} // Notifikasi baru muncul di bawah yang lama
      closeOnClick // Tutup notifikasi saat diklik
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
