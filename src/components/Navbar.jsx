import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/alumnos">Alumnos</Link>
      <Link to="/materias">Materias</Link>
      <Link to="/inscripciones">Inscripciones</Link>
      <Link to="/calificaciones">Calificaciones</Link>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;