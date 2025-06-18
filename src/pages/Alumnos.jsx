import React, { useEffect, useState } from "react";
import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  deleteAlumno
} from "../services/api";

function Alumnos({ token }) {
  const [alumnos, setAlumnos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", matricula: "", correo: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarAlumnos = async () => {
    const res = await getAlumnos(token);
    setAlumnos(res.data);
  };

  const guardarAlumno = async () => {
    const { nombre, matricula, correo } = nuevo;

    if (!nombre || !matricula || !correo) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    try {
      if (modoEdicion) {
        await updateAlumno(idEditar, nuevo);
        setMensaje("✅ Alumno actualizado");
      } else {
        await createAlumno(nuevo);
        setMensaje("✅ Alumno guardado");
      }

      setNuevo({ nombre: "", matricula: "", correo: "" });
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
    setNuevo({
      nombre: alumno.nombre,
      matricula: alumno.matricula,
      correo: alumno.correo
    });
  };

  const borrarAlumno = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este alumno?")) {
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
    <div>
      <h2>Alumnos</h2>

      {mensaje && (
        <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>
          {mensaje}
        </p>
      )}

      {alumnos.map((a) => (
        <div key={a._id}>
          {a.nombre} - {a.matricula}
          <button onClick={() => editarAlumno(a)}>Editar</button>
          <button onClick={() => borrarAlumno(a._id)}>Eliminar</button>
        </div>
      ))}

      <h3>{modoEdicion ? "Editar alumno" : "Agregar alumno"}</h3>
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
      <button onClick={guardarAlumno}>
        {modoEdicion ? "Actualizar" : "Guardar"}
      </button>
    </div>
  );
}

export default Alumnos;