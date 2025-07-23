import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-2xl font-semibold mb-2">Terjadi kesalahan.</p>
      <p className="text-gray-600 mb-4">
        Maaf, halaman yang Anda cari tidak tersedia atau terjadi error.
      </p>
      {error?.statusText || error?.message ? (
        <p className="text-sm text-red-400">
          <i>{error.statusText || error.message}</i>
        </p>
      ) : null}
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
};
