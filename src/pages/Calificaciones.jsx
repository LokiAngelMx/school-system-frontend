import React, { useEffect, useState } from "react";
import { getAlumnos, getMaterias, setCalificacion, getCalificaciones } from "../services/api";

function Calificaciones({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ alumno: "", materia: "", calificacion: 0 });
  const [calificaciones, setCalificaciones] = useState([]);

  const cargar = async () => {
    const [a, m, c] = await Promise.all([
      getAlumnos(token),
      getMaterias(token),
      getCalificaciones(token)
    ]);
    setAlumnos(a.data);
    setMaterias(m.data);
    setCalificaciones(c.data);
  };

  const guardar = async () => {
    await setCalificacion(form, token);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h2>Calificaciones</h2>
      <select onChange={(e) => setForm({ ...form, alumno: e.target.value })}>
        <option value="">Seleccione alumno</option>
        {alumnos.map(a => <option key={a._id} value={a._id}>{a.nombre}</option>)}
      </select>
      <select onChange={(e) => setForm({ ...form, materia: e.target.value })}>
        <option value="">Seleccione materia</option>
        {materias.map(m => <option key={m._id} value={m._id}>{m.nombre}</option>)}
      </select>
      <input
        type="number"
        placeholder="Calificación"
        onChange={(e) => setForm({ ...form, calificacion: parseInt(e.target.value) })}
      />
      <button onClick={guardar}>Guardar</button>

      <h3>Historial</h3>
      {calificaciones.map(c => (
        <div key={c._id}>{c.alumno?.nombre} - {c.materia?.nombre}: {c.calificacion}</div>
      ))}
    </div>
  );
}

export default Calificaciones;