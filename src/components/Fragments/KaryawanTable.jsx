import React from "react";
import { Button } from "../Elements/Button.jsx/Index";

export const KaryawanTable = ({ karyawanList, onEdit, onDelete }) => {
  if (!karyawanList || karyawanList.length === 0) {
    return (
      <p className="text-center text-gray-500 p-4">Belum ada data karyawan.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Alamat
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lulusan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tgl. Lahir
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mulai Kerja
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gaji
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {karyawanList.map((karyawan, index) => (
            <tr key={karyawan.id || index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.nama}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.alamat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.lulusan}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.tgl_lahir
                  ? new Date(karyawan.tgl_lahir).toLocaleDateString("id-ID")
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.lama_kerja
                  ? new Date(karyawan.lama_kerja).toLocaleDateString("id-ID")
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.gaji
                  ? `Rp ${Number(karyawan.gaji).toLocaleString("id-ID")}`
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button
                  classname="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 text-sm"
                  onClick={() => onEdit(karyawan)}
                >
                  Edit
                </Button>
                <Button
                  classname="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => onDelete(karyawan.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
