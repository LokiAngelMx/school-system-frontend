# 🎓 Frontend - School System

Este es el frontend de la aplicación escolar, creado con **React + Vite**. Permite gestionar alumnos, materias, inscripciones y calificaciones con una interfaz minimalista y responsiva.

## ⚙️ Tecnologías

- React
- Vite
- Axios
- React Router DOM
- CSS modular

## 🚀 Instalación

```bash
git clone https://github.com/LokiAngelMx/school-system-frontend frontend-school-vite
cd frontend-school-vite
npm install
npm run dev
```

## 📁 Estructura

```
src/
├── components/        # Navbar
├── pages/             # Alumnos, Materias, Inscripciones, Calificaciones, Login
├── services/          # api.js con funciones Axios
├── styles/            # CSS por componente
├── App.jsx
├── main.jsx
```

## 🔐 Login

- **Usuario:** `admin`
- **Contraseña:** `123456`

El token se guarda en `localStorage` y se usa automáticamente en cada solicitud.

## ✅ Funcionalidades

- Validación en formularios (campos vacíos, inscripciones duplicadas, etc.)
- Restricción para calificar solo si el alumno está inscrito
- Navbar con navegación protegida
- Diseño limpio y centrado con estilos en CSS independiente

## ✨ Autores

Desarrollado por
**Angel García**
**Daniel Moreno**
**José Muñetón**