// src/main.jsx (Ini adalah file entry point Anda, biasanya terbuat otomatis oleh Vite/CRA)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Import komponen App Anda
import "./index.css"; // Pastikan CSS global Anda diimpor jika ada

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Render komponen App Anda di sini */}
  </React.StrictMode>
);
