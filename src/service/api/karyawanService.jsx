import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://bmw-app-be.up.railway.app/api";

// ======================================================================
// Interceptor Axios untuk Penanganan Error 401 Global
// ======================================================================
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn(
        "Unauthorized or expired token detected. Redirecting to login..."
      );
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Hard redirect
      return new Promise(() => {}); // Stop further promise chain
    }
    return Promise.reject(error);
  }
);
// ======================================================================

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error(
      "No access token found in localStorage. Request might be unauthorized."
    );
    // Tidak perlu melempar error di sini, karena interceptor akan menangani 401
    // jika request tetap dikirim dan gagal di backend.
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllKaryawan = async () => {
  try {
    const response = await axios.get(`${API_URL}/karyawan`, getAuthHeader());
    return response.data.result;
  } catch (error) {
    console.error(
      "Error fetching all karyawan:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data?.message || "Gagal mengambil data karyawan";
  }
};

export const createKaryawan = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/karyawan`,
      formData,
      getAuthHeader()
    );
    return response.data.result;
  } catch (error) {
    console.error(
      "Error creating karyawan:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data?.message || "Gagal menambahkan karyawan";
  }
};

export const updateKaryawan = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/karyawan/${id}`,
      formData,
      getAuthHeader()
    );
    return response.data.result;
  } catch (error) {
    console.error(
      "Error updating karyawan:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data?.message || "Gagal memperbarui karyawan";
  }
};

export const deleteKaryawan = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/karyawan/${id}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting karyawan:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data?.message || "Gagal menghapus karyawan";
  }
};
