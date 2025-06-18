import React, { useEffect, useState } from "react";
import {
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria,
} from "../services/api";
import "../styles/materias.css";

function Materias({ token }) {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ nombre: "", clave: "", profesor: "" });
  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarMaterias = async () => {
    const res = await getMaterias(token);
    setMaterias(res.data);
  };

  const guardarMateria = async () => {
    const { nombre, clave, profesor } = form;
    if (!nombre || !clave || !profesor) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    try {
      if (modoEdicion) {
        await updateMateria(idEditar, form);
        setMensaje("✅ Materia actualizada");
      } else {
        await createMateria(form);
        setMensaje("✅ Materia registrada");
      }

      setForm({ nombre: "", clave: "", profesor: "" });
      setModoEdicion(false);
      setIdEditar(null);
      cargarMaterias();
    } catch (err) {
      setMensaje("❌ Error al guardar");
    }

    setTimeout(() => setMensaje(""), 2000);
  };

  const editarMateria = (materia) => {
    setModoEdicion(true);
    setIdEditar(materia._id);
    setForm({
      nombre: materia.nombre,
      clave: materia.clave,
      profesor: materia.profesor || "",
    });
  };

  const borrarMateria = async (id) => {
    if (confirm("¿Eliminar esta materia?")) {
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
    <div className="materias-container">
      <h2>Materias</h2>
      {mensaje && (
        <p
          className={
            mensaje.includes("❌") || mensaje.includes("⚠️")
              ? "error"
              : "success"
          }
        >
          {mensaje}
        </p>
      )}

      <div className="form-section">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Clave"
          value={form.clave}
          onChange={(e) => setForm({ ...form, clave: e.target.value })}
        />
        <input
          placeholder="Profesor"
          value={form.profesor}
          onChange={(e) => setForm({ ...form, profesor: e.target.value })}
        />
        <button onClick={guardarMateria}>
          {modoEdicion ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <div className="lista-materias">
        {materias.map((m) => (
          <div key={m._id} className="materia-card">
            <div>
              <p>
                <strong>{m.nombre}</strong>
              </p>
              <p>{m.clave}</p>
              <p>
                <em>{m.profesor}</em>
              </p>
            </div>
            <div>
              <button onClick={() => editarMateria(m)}>Editar</button>
              <button onClick={() => borrarMateria(m._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materias;