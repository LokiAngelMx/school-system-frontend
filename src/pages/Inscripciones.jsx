import React, { useEffect, useState } from "react";
import { getAlumnos, getMaterias, createInscripcion, getInscripciones } from "../services/api";

function Inscripciones({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [form, setForm] = useState({ alumno: "", materia: "" });

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
    await createInscripcion(form, token);
    cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div>
      <h2>Inscripciones</h2>
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