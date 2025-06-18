import React, { useEffect, useState } from "react";
import {
  getAlumnos,
  getMaterias,
  getCalificaciones,
  setCalificacion,
  updateCalificacion,
  deleteCalificacion
} from "../services/api";

function Calificaciones({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [form, setForm] = useState({ alumno: "", materia: "", calificacion: 0 });
  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

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
    const { alumno, materia, calificacion } = form;

    if (!alumno || !materia || calificacion === 0 || isNaN(calificacion)) {
      setMensaje("⚠️ Todos los campos son obligatorios y la calificación debe ser válida");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    try {
      if (modoEdicion) {
        await updateCalificacion(idEditar, form);
        setMensaje("✅ Calificación actualizada");
      } else {
        await setCalificacion(form);
        setMensaje("✅ Calificación registrada");
      }

      setForm({ alumno: "", materia: "", calificacion: 0 });
      setModoEdicion(false);
      setIdEditar(null);
      cargar();
    } catch (err) {
      setMensaje("❌ Error al guardar calificación");
    }

    setTimeout(() => setMensaje(""), 2000);
  };

  const editar = (c) => {
    setModoEdicion(true);
    setIdEditar(c._id);
    setForm({
      alumno: c.alumno?._id || "",
      materia: c.materia?._id || "",
      calificacion: c.calificacion
    });
  };

  const borrar = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta calificación?")) {
      await deleteCalificacion(id);
      setMensaje("✅ Calificación eliminada");
      cargar();
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h2>Calificaciones</h2>

      {mensaje && (
        <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>
          {mensaje}
        </p>
      )}

      <h3>{modoEdicion ? "Editar calificación" : "Registrar calificación"}</h3>

      <select
        value={form.alumno}
        onChange={(e) => setForm({ ...form, alumno: e.target.value })}
      >
        <option value="">Seleccione alumno</option>
        {alumnos.map((a) => (
          <option key={a._id} value={a._id}>{a.nombre}</option>
        ))}
      </select>

      <select
        value={form.materia}
        onChange={(e) => setForm({ ...form, materia: e.target.value })}
      >
        <option value="">Seleccione materia</option>
        {materias.map((m) => (
          <option key={m._id} value={m._id}>{m.nombre}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Calificación"
        value={form.calificacion}
        onChange={(e) => setForm({ ...form, calificacion: e.target.value })}
      />

      <button onClick={guardar}>
        {modoEdicion ? "Actualizar" : "Guardar"}
      </button>

      <h3>Historial</h3>
      {calificaciones.map((c) => (
        <div key={c._id}>
          {c.alumno?.nombre} - {c.materia?.nombre} = {c.calificacion}
          <button onClick={() => editar(c)}>Editar</button>
          <button onClick={() => borrar(c._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default Calificaciones;