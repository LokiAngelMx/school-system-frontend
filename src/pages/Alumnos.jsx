import React, { useEffect, useState } from "react";
import { getAlumnos, createAlumno } from "../services/api";

function Alumnos({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", matricula: "", correo: "" });

  const cargarAlumnos = async () => {
    const res = await getAlumnos(token);
    setAlumnos(res.data);
  };

  const agregarAlumno = async () => {
    await createAlumno(nuevo, token);
    setNuevo({ nombre: "", matricula: "", correo: "" });
    cargarAlumnos();
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  return (
    <div>
      <h2>Alumnos</h2>
      {alumnos.map((a) => (
        <div key={a._id}>{a.nombre} - {a.matricula}</div>
      ))}
      <h3>Agregar</h3>
      <input placeholder="Nombre" onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
      <input placeholder="Matrícula" onChange={(e) => setNuevo({ ...nuevo, matricula: e.target.value })} />
      <input placeholder="Correo" onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })} />
      <button onClick={agregarAlumno}>Guardar</button>
    </div>
  );
}

export default Alumnos;