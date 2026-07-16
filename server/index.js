import express from 'express';
import cors from 'cors';
import db from './db.js'; // Importamos la conexión que ya probaste

const app = express();
const PORT = 5000; // El puerto donde correrá tu servidor backend

// Middlewares
app.use(cors()); // Permite peticiones desde tu frontend en React
app.use(express.json()); // Permite que el servidor entienda datos en formato JSON (como formularios)

// ==========================================
// RUTA PARA OBTENER TODOS LOS USUARIOS
// ==========================================
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      return res.status(500).json({ error: 'Error en el servidor al consultar los usuarios' });
    }
    res.json(results); // Le responde a React con la lista de usuarios real
  });
});

// ==========================================
// RUTA PARA REGISTRAR UN NUEVO USUARIO
// ==========================================
app.post('/api/usuarios', (req, res) => {
  const { nombre, apellido, correo, contrasena, telefono, id_rol } = req.body;

  const query = `
    INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, id_rol) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nombre, apellido, correo, contrasena, telefono, id_rol], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar el usuario en la base de datos' });
    }
    res.status(201).json({ mensaje: '¡Usuario registrado con éxito!', id_usuario: result.insertId });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});