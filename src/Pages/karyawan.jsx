import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layouts/DashboardLayouts";
import { KaryawanTable } from "../components/Fragments/KaryawanTable";
import { FormKaryawan } from "../components/Fragments/FormKaryawan";
import {
  getAllKaryawan,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
} from "../service/api/karyawanService";

import { exportToCsv, exportToPdf, jsPDF } from "../Utils/exportsUtils";
import { Button } from "../components/Elements/Button.jsx/Index";
import { toast } from "react-toastify";

export const KaryawanPage = () => {
  const [karyawanList, setKaryawanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingKaryawan, setEditingKaryawan] = useState(null);

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const fetchKaryawan = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllKaryawan();
      // Lakukan sorting di sini sesuai abjad nama karyawan
      const sortedData = [...data].sort((a, b) => {
        const namaA = a.nama.toLowerCase(); // Ubah ke huruf kecil untuk perbandingan case-insensitive
        const namaB = b.nama.toLowerCase(); // Ubah ke huruf kecil

        if (namaA < namaB) {
          return -1; // namaA harus di depan namaB
        }
        if (namaA > namaB) {
          return 1; // namaA harus di belakang namaB
        }
        return 0; // namaA dan namaB sama
      });
      setKaryawanList(sortedData); // Set state dengan data yang sudah diurutkan
    } catch (err) {
      setError(err);
      console.error("Error fetching karyawan in KaryawanPage:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUpdateKaryawan = async (formData) => {
    try {
      if (editingKaryawan) {
        const dataToUpdate = { ...formData };
        delete dataToUpdate.id;
        delete dataToUpdate.createdAt;
        delete dataToUpdate.updatedAt;
        delete dataToUpdate.userId;

        await updateKaryawan(editingKaryawan.id, dataToUpdate);
        toast.success("Data karyawan berhasil diperbarui!");
      } else {
        await createKaryawan(formData);
        alert("Karyawan baru berhasil ditambahkan!");
      }
      setShowFormModal(false);
      setEditingKaryawan(null);
      fetchKaryawan(); // Panggil ulang untuk mendapatkan data terbaru yang sudah diurutkan
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan yang tidak diketahui.";
      alert(`Gagal menyimpan data karyawan: ${errorMessage}`);
      console.error("Error in handleCreateUpdateKaryawan:", err);
    }
  };

  const handleDeleteKaryawan = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      try {
        await deleteKaryawan(id);
        toast.success("Karyawan berhasil dihapus!");
        fetchKaryawan(); // Panggil ulang untuk mendapatkan data terbaru yang sudah diurutkan
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan yang tidak diketahui.";
        alert(`Gagal menghapus karyawan: ${errorMessage}`);
        console.error("Error in handleDeleteKaryawan:", err);
      }
    }
  };

  const handleOpenAddForm = () => {
    setEditingKaryawan(null);
    setShowFormModal(true);
  };

  const handleOpenEditForm = (karyawan) => {
    setEditingKaryawan(karyawan);
    setShowFormModal(true);
  };

  const handleExportToPdf = () => {
    const columns = [
      { header: "ID", dataKey: "id" },
      { header: "Nama", dataKey: "nama" },
      { header: "Alamat", dataKey: "alamat" },
      { header: "Lulusan", dataKey: "lulusan" },
      { header: "Tgl Lahir", dataKey: "tgl_lahir" },
      { header: "Mulai Kerja", dataKey: "lama_kerja" },
      { header: "Gaji", dataKey: "gaji" },
    ];
    const dataToExport = karyawanList.map((karyawan) => ({
      id: karyawan.id,
      nama: karyawan.nama,
      alamat: karyawan.alamat,
      lulusan: karyawan.lulusan,
      tgl_lahir: new Date(karyawan.tgl_lahir).toLocaleDateString("id-ID"),
      lama_kerja: new Date(karyawan.lama_kerja).toLocaleDateString("id-ID"),
      gaji: karyawan.gaji,
    }));
    exportToPdf("data_karyawan.pdf", dataToExport, columns, "Daftar Karyawan");
  };

  // fungsi untuk exportcsv
  const handleExportToCsv = () => {
    // Definisikan header yang akan muncul di file CSV/Excel
    const headers = [
      "id",
      "nama",
      "alamat",
      "lulusan",
      "tgl_lahir",
      "lama_kerja",
      "gaji",
    ];

    const dataToExport = karyawanList.map((karyawan) => ({
      nama: karyawan.nama,
      alamat: karyawan.alamat,
      lulusan: karyawan.lulusan,
      // Format tanggal agar lebih mudah dibaca di Excel
      tgl_lahir: new Date(karyawan.tgl_lahir).toLocaleDateString("id-ID"),
      lama_kerja: new Date(karyawan.lama_kerja).toLocaleDateString("id-ID"),
      gaji: karyawan.gaji,
    }));

    exportToCsv("data_karyawan.csv", dataToExport, headers);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center p-4 text-blue-600">
          Memuat data karyawan...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center p-4 text-red-600">
          Error: {error.message || error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Manajemen Karyawan
      </h1>
      <div className="mb-6 flex justify-end gap-3">
        <Button
          classname="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
          onClick={handleExportToCsv}
        >
          Export to Excel (CSV)
        </Button>
        <Button
          classname="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md"
          onClick={handleExportToPdf}
        >
          Export to PDF
        </Button>
        <Button
          classname="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md"
          onClick={handleOpenAddForm}
        >
          Tambah Karyawan Baru
        </Button>
      </div>
      <KaryawanTable
        karyawanList={karyawanList}
        onEdit={handleOpenEditForm}
        onDelete={handleDeleteKaryawan}
      />

      {showFormModal && (
        <div className="absolute inset-0 flex items-center justify-center z-40 p-4 pointer-events-none">
          <div className="pointer-events-auto">
            <FormKaryawan
              onSubmit={handleCreateUpdateKaryawan}
              onCancel={() => {
                setShowFormModal(false);
                setEditingKaryawan(null);
              }}
              initialData={editingKaryawan}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
