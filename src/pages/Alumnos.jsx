import React, { useEffect, useState } from "react";
import { getAlumnos, createAlumno } from "../services/api";

function Alumnos({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", matricula: "", correo: "" });
  const [mensaje, setMensaje] = useState("");

  const cargarAlumnos = async () => {
    const res = await getAlumnos(token);
    setAlumnos(res.data);
  };

  const agregarAlumno = async () => {
    const { nombre, matricula, correo } = nuevo;

    if (!nombre || !matricula || !correo) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    await createAlumno(nuevo);
    setNuevo({ nombre: "", matricula: "", correo: "" });
    setMensaje("✅ Alumno guardado");
    cargarAlumnos();
    setTimeout(() => setMensaje(""), 2000);
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
      <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>{mensaje}</p>
      <h3>Agregar</h3>
      <input
        placeholder="Nombre"
        value={nuevo.nombre}
        onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
      />
      <input
        placeholder="Matrícula"
        value={nuevo.matricula}
        onChange={(e) => setNuevo({ ...nuevo, matricula: e.target.value })}
      />
      <input
        placeholder="Correo"
        value={nuevo.correo}
        onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
      />
      <button onClick={agregarAlumno}>Guardar</button>
    </div>
  );
}

export default Alumnos;