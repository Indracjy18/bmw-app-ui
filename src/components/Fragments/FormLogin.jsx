import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../Elements/Input/Index";
import { Button } from "../Elements/Button.jsx/Index";
import { loginUser } from "../../service/api/authService";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await loginUser(email, password); // panggil service
      localStorage.setItem("accessToken", res.accessToken); // simpan token dari backend
      navigate("/dashboard"); // redirect setelah login
    } catch (err) {
      setErrorMsg("Login gagal. Periksa email dan password.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="xxxxxxxxxxxxxxx"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <Button classname="bg-blue-500 w-full" type="submit">
        Login
      </Button>
    </form>
  );
};
