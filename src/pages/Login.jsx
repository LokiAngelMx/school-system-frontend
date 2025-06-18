import React, { useState } from "react";
import { login } from "../services/api";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      const token = res.data.token;

      setToken(token);
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // redirecciona a la vista de alumnos
      navigate("/alumnos");
    } catch (err) {
      alert("Login incorrecto");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <h2>Iniciar sesión</h2>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;