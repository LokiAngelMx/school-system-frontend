import React, { useState } from "react";
import { login } from "../services/api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      alert("Login exitoso");
    } catch (err) {
      alert("Login incorrecto");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      <input placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;