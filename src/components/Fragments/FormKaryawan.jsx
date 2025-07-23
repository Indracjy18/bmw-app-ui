import React, { useState, useEffect } from "react";
import { InputForm } from "../Elements/Input/Index";
import { Button } from "../Elements/Button.jsx/Index";

export const FormKaryawan = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    lulusan: "",
    tgl_lahir: "",
    lama_kerja: "",
    gaji: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tgl_lahir: initialData.tgl_lahir
          ? new Date(initialData.tgl_lahir).toISOString().split("T")[0]
          : "",
        lama_kerja: initialData.lama_kerja
          ? new Date(initialData.lama_kerja).toISOString().split("T")[0]
          : "",
        gaji: initialData.gaji.toString(),
      });
    } else {
      setFormData({
        nama: "",
        alamat: "",
        lulusan: "",
        tgl_lahir: "",
        lama_kerja: "",
        gaji: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      gaji: Number(formData.gaji),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">
        {initialData ? "Edit Karyawan" : "Tambah Karyawan Baru"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputForm
          label="Nama"
          name="nama"
          type="text"
          placeholder="Nama Lengkap"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Alamat"
          name="alamat"
          type="text"
          placeholder="Alamat Tinggal"
          value={formData.alamat}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Lulusan"
          name="lulusan"
          type="text"
          placeholder="Pendidikan Terakhir"
          value={formData.lulusan}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Tanggal Lahir"
          name="tgl_lahir"
          type="date"
          value={formData.tgl_lahir}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Tanggal Mulai Kerja"
          name="lama_kerja"
          type="date"
          value={formData.lama_kerja}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Gaji"
          name="gaji"
          type="number"
          placeholder="Misal: 6000000"
          value={formData.gaji}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            classname="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button
            classname="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};
