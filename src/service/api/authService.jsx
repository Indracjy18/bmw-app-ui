import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    // Simpan token
    localStorage.setItem("accessToken", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login gagal, coba lagi.";
  }
};
