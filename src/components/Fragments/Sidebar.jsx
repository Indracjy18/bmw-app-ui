import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#003B73] text-white shadow-md flex flex-col">
      <div className="p-6 font-bold text-xl border-b border-white/20">
        BANYUPENTA
      </div>
      <nav className="p-4 space-y-2 flex-grow">
        {" "}
        {/* flex-grow agar nav mengisi ruang kosong */}
        <Link
          to="/dashboard"
          className="block px-4 py-2 rounded hover:bg-[#005fa3] transition duration-150 ease-in-out"
        >
          Dashboard
        </Link>
        <Link
          to={"/karyawan"}
          className="block px-4 py-2 rounded hover:bg-[#005fa3] transition duration-150 ease-in-out"
        >
          Data Karyawan
        </Link>
        {/* Tambahkan link navigasi lain di sini jika ada */}
      </nav>
      {/* Opsional: footer di sidebar */}
      <div className="p-4 text-xs text-white/50 border-t border-white/20">
        &copy; 2025 BanyuPenta.
      </div>
    </div>
  );
}
