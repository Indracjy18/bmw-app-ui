import jsPDF from "jspdf";
import "jspdf-autotable";

console.log(
  "exportsUtils.jsx: jsPDF.prototype after autotable import:",
  jsPDF.prototype
);
console.log(
  "exportsUtils.jsx: Does jsPDF.prototype have autoTable?",
  "autoTable" in jsPDF.prototype
);

export { jsPDF };
// --------------------------------------------

export const exportToCsv = (filename, data, headers) => {
  if (!data || data.length === 0) {
    alert("Tidak ada data untuk diekspor.");
    return;
  }

  const csvHeaders = headers
    ? headers.map((header) => `"${header}"`).join(",")
    : Object.keys(data[0])
        .map((key) => `"${key}"`)
        .join(",");

  const csvRows = data.map((row) => {
    const values = headers
      ? headers.map((header) => {
          const value =
            row[header] !== undefined && row[header] !== null
              ? row[header]
              : "";
          // Handle koma dan kutip ganda dalam nilai sel
          return `"${String(value).replace(/"/g, '""').replace(/,/g, "\\,")}"`;
        })
      : Object.values(row).map((value) => {
          const val = value !== undefined && value !== null ? value : "";
          // Handle koma dan kutip ganda dalam nilai sel
          return `"${String(val).replace(/"/g, '""').replace(/,/g, "\\,")}"`;
        });
    return values.join(",");
  });

  const csvString = [csvHeaders, ...csvRows].join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    alert("Browser Anda tidak mendukung fitur download file.");
  }
};

export const exportToPdf = (
  filename,
  data,
  columns,
  title = "Laporan Karyawan"
) => {
  if (!data || data.length === 0) {
    alert("Tidak ada data untuk diekspor.");
    return;
  }

  // --- CONSOLE LOG DIAGNOSTIK DI DALAM FUNGSI exportToPdf ---
  console.log(
    "exportsUtils.jsx (Inside exportToPdf): jsPDF.prototype after all local imports, right before new jsPDF():",
    jsPDF.prototype
  );
  console.log(
    "exportsUtils.jsx (Inside exportToPdf): Does jsPDF.prototype have autoTable RIGHT before new jsPDF()?",
    "autoTable" in jsPDF.prototype
  );
  // --------------------------------------------------------

  const doc = new jsPDF(); // Membuat instance jsPDF

  // Tambahkan judul
  doc.setFontSize(16);
  doc.text(title, 14, 20); // Posisi judul

  // Siapkan kolom dan baris untuk autotable
  const tableColumnHeaders = columns.map((col) => col.header); // Hanya ambil header
  const tableRows = data.map((item) => columns.map((col) => item[col.dataKey])); // Ambil data sesuai dataKey

  doc.autoTable({
    // Baris ini yang menyebabkan error jika autoTable tidak ada
    head: [tableColumnHeaders], // Header tabel
    body: tableRows, // Data baris
    startY: 30, // Mulai tabel setelah judul
    theme: "striped", // Tema tabel (bisa 'grid', 'plain', 'striped')
    headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Warna header
    alternateRowStyles: { fillColor: [245, 245, 245] }, // Warna baris bergantian
    styles: { fontSize: 8, cellPadding: 3 }, // Gaya sel
    margin: { top: 10, right: 10, bottom: 10, left: 10 }, // Margin halaman
  });

  doc.save(filename);
};
