import React, { useEffect, useState } from "react";
import {
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria
} from "../services/api";

function Materias({ token }) {
  const [materias, setMaterias] = useState([]);
  const [nueva, setNueva] = useState({ nombre: "", clave: "", profesor: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarMaterias = async () => {
    const res = await getMaterias(token);
    setMaterias(res.data);
  };

  const guardarMateria = async () => {
    const { nombre, clave, profesor } = nueva;

    if (!nombre || !clave || !profesor) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    try {
      if (modoEdicion) {
        await updateMateria(idEditar, nueva);
        setMensaje("✅ Materia actualizada");
      } else {
        await createMateria(nueva);
        setMensaje("✅ Materia registrada");
      }

      setNueva({ nombre: "", clave: "", profesor: "" });
      setModoEdicion(false);
      setIdEditar(null);
      cargarMaterias();
    } catch (err) {
      setMensaje("❌ Error al guardar materia");
    }

    setTimeout(() => setMensaje(""), 2000);
  };

  const editarMateria = (materia) => {
    setModoEdicion(true);
    setIdEditar(materia._id);
    setNueva({
      nombre: materia.nombre,
      clave: materia.clave,
      profesor: materia.profesor
    });
  };

  const borrarMateria = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta materia?")) {
      await deleteMateria(id);
      setMensaje("✅ Materia eliminada");
      cargarMaterias();
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  return (
    <div>
      <h2>Materias</h2>

      {mensaje && (
        <p style={{ color: mensaje.includes("⚠️") || mensaje.includes("❌") ? "red" : "green" }}>
          {mensaje}
        </p>
      )}

      {materias.map((m) => (
        <div key={m._id}>
          {m.nombre} - {m.clave}
          <button onClick={() => editarMateria(m)}>Editar</button>
          <button onClick={() => borrarMateria(m._id)}>Eliminar</button>
        </div>
      ))}

      <h3>{modoEdicion ? "Editar materia" : "Agregar materia"}</h3>
      <input
        placeholder="Nombre"
        value={nueva.nombre}
        onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
      />
      <input
        placeholder="Clave"
        value={nueva.clave}
        onChange={(e) => setNueva({ ...nueva, clave: e.target.value })}
      />
      <input
        placeholder="Profesor"
        value={nueva.profesor}
        onChange={(e) => setNueva({ ...nueva, profesor: e.target.value })}
      />
      <button onClick={guardarMateria}>
        {modoEdicion ? "Actualizar" : "Guardar"}
      </button>
    </div>
  );
}

export default Materias;