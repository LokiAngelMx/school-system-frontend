import React, { useEffect, useState } from "react";
import {
  getAlumnos,
  getMaterias,
  getInscripciones,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion
} from "../services/api";

function Inscripciones({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [form, setForm] = useState({ alumno: "", materia: "" });
  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

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

  const guardarInscripcion = async () => {
    const { alumno, materia } = form;

    if (!alumno || !materia) {
      setMensaje("⚠️ Debes seleccionar alumno y materia");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    // Validar que no exista ya una inscripción igual (cuando NO estamos en modo edición)
    const yaInscrito = inscripciones.find(
      (i) => i.alumno?._id === alumno && i.materia?._id === materia
    );

    if (yaInscrito && !modoEdicion) {
      setMensaje("⚠️ El alumno ya está inscrito en esta materia");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    try {
      if (modoEdicion) {
        await updateInscripcion(idEditar, form);
        setMensaje("✅ Inscripción actualizada");
      } else {
        await createInscripcion(form);
        setMensaje("✅ Inscripción registrada");
      }

      setForm({ alumno: "", materia: "" });
      setModoEdicion(false);
      setIdEditar(null);
      cargarDatos();
    } catch (err) {
      if (err.response?.status === 400) {
        setMensaje("⚠️ El alumno ya está inscrito en esta materia");
      } else {
        setMensaje("❌ Error al guardar inscripción");
      }
    }

    setTimeout(() => setMensaje(""), 2000);
  };

  const editarInscripcion = (insc) => {
    setModoEdicion(true);
    setIdEditar(insc._id);
    setForm({
      alumno: insc.alumno?._id || "",
      materia: insc.materia?._id || ""
    });
  };

  const borrarInscripcion = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta inscripción?")) {
      await deleteInscripcion(id);
      setMensaje("✅ Inscripción eliminada");
      cargarDatos();
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div>
      <h2>Inscripciones</h2>

      {mensaje && (
        <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>
          {mensaje}
        </p>
      )}

      <h3>{modoEdicion ? "Editar inscripción" : "Registrar inscripción"}</h3>

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

      <button onClick={guardarInscripcion}>
        {modoEdicion ? "Actualizar" : "Guardar"}
      </button>

      <h3>Historial</h3>
      {inscripciones.map((i) => (
        <div key={i._id}>
          {i.alumno?.nombre} → {i.materia?.nombre}
          <button onClick={() => editarInscripcion(i)}>Editar</button>
          <button onClick={() => borrarInscripcion(i._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default Inscripciones;