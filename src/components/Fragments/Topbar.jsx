import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Elements/Button.jsx/Index";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token dari localStorage
    navigate("/login"); // Redirect ke halaman login
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b mt-1">
      <h1 className="text-xl font-semibold text-[#003B73]">Dashboard</h1>
      <Button
        onClick={handleLogout}
        classname="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-150 ease-in-out"
      >
        Logout
      </Button>
    </header>
  );
}
