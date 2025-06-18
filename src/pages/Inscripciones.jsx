import React, { useEffect, useState } from "react";
import { getAlumnos, getMaterias, createInscripcion, getInscripciones } from "../services/api";

function Inscripciones({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [form, setForm] = useState({ alumno: "", materia: "" });
  const [mensaje, setMensaje] = useState("");

  const cargarDatos = async () => {
    const [a, m, i] = await Promise.all([
      getAlumnos(token),
      getMaterias(token),
      getInscripciones(token)
    ]);
    setAlumnos(a.data);
    setMaterias(m.data);
    setInscripciones(i.data);
  };

  const inscribir = async () => {
    const { alumno, materia } = form;

    if (!alumno || !materia) {
      setMensaje("⚠️ Debes seleccionar un alumno y una materia");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    await createInscripcion(form);
    setMensaje("✅ Inscripción realizada");
    cargarDatos();
    setTimeout(() => setMensaje(""), 2000);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div>
      <h2>Inscripciones</h2>
      <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>{mensaje}</p>
      <select onChange={(e) => setForm({ ...form, alumno: e.target.value })}>
        <option value="">Seleccione alumno</option>
        {alumnos.map(a => <option key={a._id} value={a._id}>{a.nombre}</option>)}
      </select>
      <select onChange={(e) => setForm({ ...form, materia: e.target.value })}>
        <option value="">Seleccione materia</option>
        {materias.map(m => <option key={m._id} value={m._id}>{m.nombre}</option>)}
      </select>
      <button onClick={inscribir}>Inscribir</button>
      <h3>Historial</h3>
      {inscripciones.map((i) => (
        <div key={i._id}>{i.alumno?.nombre} → {i.materia?.nombre}</div>
      ))}
    </div>
  );
}

export default Inscripciones;