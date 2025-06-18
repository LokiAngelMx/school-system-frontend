import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Inyectar token automáticamente si existe
const token = localStorage.getItem("token");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Interceptor: detectar token inválido y redirigir al login
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      alert("⚠️ Sesión expirada. Inicia sesión nuevamente.");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export const login = (data) => API.post("/auth/login", data);
export const getAlumnos = () => API.get("/alumnos");
export const createAlumno = (data) => API.post("/alumnos", data);
export const getMaterias = () => API.get("/materias");
export const createMateria = (data) => API.post("/materias", data);
export const getInscripciones = () => API.get("/inscripciones");
export const createInscripcion = (data) => API.post("/inscripciones", data);
export const getCalificaciones = () => API.get("/calificaciones");
export const setCalificacion = (data) => API.post("/calificaciones", data);

export default API;