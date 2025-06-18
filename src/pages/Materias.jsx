import React, { useEffect, useState } from "react";
import { getMaterias, createMateria } from "../services/api";

function Materias({ token }) {
  const [materias, setMaterias] = useState([]);
  const [nueva, setNueva] = useState({ nombre: "", clave: "", profesor: "" });
  const [mensaje, setMensaje] = useState("");

  const cargarMaterias = async () => {
    const res = await getMaterias(token);
    setMaterias(res.data);
  };

  const agregarMateria = async () => {
    const { nombre, clave, profesor } = nueva;

    if (!nombre || !clave || !profesor) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    await createMateria(nueva);
    setNueva({ nombre: "", clave: "", profesor: "" });
    setMensaje("✅ Materia registrada");
    cargarMaterias();
    setTimeout(() => setMensaje(""), 2000);
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  return (
    <div>
      <h2>Materias</h2>
      {materias.map((m) => (
        <div key={m._id}>{m.nombre} - {m.clave}</div>
      ))}
      <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>{mensaje}</p>
      <h3>Agregar</h3>
      <input
        placeholder="Nombre"
        value={nueva.nombre}
        onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
      />
      <input
        placeholder="Clave"
        value={nueva.clave}
        onChange={(e) => setNueva({ ...nueva, clave: e.target.value })}
      />
      <input
        placeholder="Profesor"
        value={nueva.profesor}
        onChange={(e) => setNueva({ ...nueva, profesor: e.target.value })}
      />

      <button onClick={agregarMateria}>Guardar</button>
    </div>
  );
}

export default Materias;