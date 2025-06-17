import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const login = (data) => API.post("/auth/login", data);
export const getAlumnos = (token) => API.get("/alumnos", { headers: { Authorization: `Bearer ${token}` } });
export const createAlumno = (data, token) => API.post("/alumnos", data, { headers: { Authorization: `Bearer ${token}` } });
export const getMaterias = (token) => API.get("/materias", { headers: { Authorization: `Bearer ${token}` } });
export const createMateria = (data, token) => API.post("/materias", data, { headers: { Authorization: `Bearer ${token}` } });
export const getInscripciones = (token) => API.get("/inscripciones", { headers: { Authorization: `Bearer ${token}` } });
export const createInscripcion = (data, token) => API.post("/inscripciones", data, { headers: { Authorization: `Bearer ${token}` } });
export const getCalificaciones = (token) => API.get("/calificaciones", { headers: { Authorization: `Bearer ${token}` } });
export const setCalificacion = (data, token) => API.post("/calificaciones", data, { headers: { Authorization: `Bearer ${token}` } });