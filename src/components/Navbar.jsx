import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // te regresa al login
    window.location.reload(); // fuerza recarga para limpiar el estado global
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "10px", background: "#f0f0f0" }}>
      <Link to="/alumnos">Alumnos</Link>
      <Link to="/materias">Materias</Link>
      <Link to="/inscripciones">Inscripciones</Link>
      <Link to="/calificaciones">Calificaciones</Link>
      <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;