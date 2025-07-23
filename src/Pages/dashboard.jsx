// src/pages/dashboard.jsx
import React, { useState, useEffect } from "react"; // Import useState dan useEffect
import DashboardLayout from "../components/Layouts/DashboardLayouts";
import { getAllKaryawan } from "../service/api/karyawanService"; // Import fungsi untuk mengambil data karyawan

export function Dashboard() {
  const [totalKaryawan, setTotalKaryawan] = useState(0); // State untuk menyimpan total karyawan
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    const fetchTotalKaryawan = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllKaryawan(); // Ambil semua data karyawan
        setTotalKaryawan(data.length); // Hitung jumlah data
      } catch (err) {
        setError(err);
        console.error("Error fetching total karyawan for dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalKaryawan();
  }, []); // [] agar hanya berjalan sekali saat komponen di-mount

  return (
    <DashboardLayout>
      <div className="text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">
          Selamat Datang di Dashboard!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Karyawan</h3>
            {loading ? (
              <p className="text-4xl font-bold text-blue-600">...</p>
            ) : error ? (
              <p className="text-xl font-bold text-red-600">Error!</p>
            ) : (
              <p className="text-4xl font-bold text-blue-600">
                {totalKaryawan}
              </p>
            )}
          </div>
          {/* Anda bisa menambahkan card lain di sini, misal: */}
          {/* <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pemasukan Bulan Ini</h3>
            <p className="text-4xl font-bold text-green-600">Rp 123.456.789</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Proyek Aktif</h3>
            <p className="text-4xl font-bold text-yellow-600">5</p>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
