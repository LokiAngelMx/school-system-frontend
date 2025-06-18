import React, { useEffect, useState } from "react";
import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  deleteAlumno
} from "../services/api";
import "../styles/alumnos.css";

function Alumnos({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [form, setForm] = useState({ nombre: "", matricula: "", correo: "" });
  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarAlumnos = async () => {
    const res = await getAlumnos(token);
    setAlumnos(res.data);
  };

  const guardarAlumno = async () => {
    const { nombre, matricula, correo } = form;
    if (!nombre || !matricula || !correo) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    try {
      if (modoEdicion) {
        await updateAlumno(idEditar, form);
        setMensaje("✅ Alumno actualizado");
      } else {
        await createAlumno(form);
        setMensaje("✅ Alumno registrado");
      }
      setForm({ nombre: "", matricula: "", correo: "" });
      setModoEdicion(false);
      setIdEditar(null);
      cargarAlumnos();
    } catch (err) {
      setMensaje("❌ Error al guardar alumno");
    }

    setTimeout(() => setMensaje(""), 2000);
  };

  const editarAlumno = (alumno) => {
    setModoEdicion(true);
    setIdEditar(alumno._id);
    setForm({ nombre: alumno.nombre, matricula: alumno.matricula, correo: alumno.correo });
  };

  const borrarAlumno = async (id) => {
    if (confirm("¿Eliminar este alumno?")) {
      await deleteAlumno(id);
      setMensaje("✅ Alumno eliminado");
      cargarAlumnos();
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  return (
    <div className="alumnos-container">
      <h2>Alumnos</h2>
      {mensaje && (
        <p className={mensaje.includes("❌") || mensaje.includes("⚠️") ? "error" : "success"}>{mensaje}</p>
      )}

      <div className="form-section">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Matrícula"
          value={form.matricula}
          onChange={(e) => setForm({ ...form, matricula: e.target.value })}
        />
        <input
          placeholder="Correo"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />
        <button onClick={guardarAlumno} className="guardar-btn">
          {modoEdicion ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <div className="lista-alumnos">
        {alumnos.map((a) => (
          <div key={a._id} className="alumno-card">
            <div>
              <p><strong>{a.nombre}</strong> ({a.matricula})</p>
              <p>{a.correo}</p>
            </div>
            <div>
              <button className="editar-btn" onClick={() => editarAlumno(a)}>Editar</button>
              <button className="eliminar-btn" onClick={() => borrarAlumno(a._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alumnos;