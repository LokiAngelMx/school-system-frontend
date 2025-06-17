import React, { useEffect, useState } from "react";
import { getMaterias, createMateria } from "../services/api";

function Materias({ token }) {
  const [materias, setMaterias] = useState([]);
  const [nueva, setNueva] = useState({ nombre: "", clave: "", profesor: "" });

  const cargarMaterias = async () => {
    const res = await getMaterias(token);
    setMaterias(res.data);
  };

  const agregarMateria = async () => {
    await createMateria(nueva, token);
    setNueva({ nombre: "", clave: "", profesor: "" });
    cargarMaterias();
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
      <h3>Agregar</h3>
      <input placeholder="Nombre" onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} />
      <input placeholder="Clave" onChange={(e) => setNueva({ ...nueva, clave: e.target.value })} />
      <input placeholder="Profesor" onChange={(e) => setNueva({ ...nueva, profesor: e.target.value })} />
      <button onClick={agregarMateria}>Guardar</button>
    </div>
  );
}

export default Materias;