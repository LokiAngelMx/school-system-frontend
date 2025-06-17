import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Alumnos from "./pages/Alumnos.jsx";
import Materias from "./pages/Materias.jsx";
import Inscripciones from "./pages/Inscripciones.jsx";
import Calificaciones from "./pages/Calificaciones.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      {token && <Navbar />} {/* Solo muestra navbar si hay sesión */}
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/alumnos" element={<Alumnos token={token} />} />
        <Route path="/materias" element={<Materias token={token} />} />
        <Route path="/inscripciones" element={<Inscripciones token={token} />} />
        <Route path="/calificaciones" element={<Calificaciones token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;