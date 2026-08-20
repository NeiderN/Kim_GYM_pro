import express from 'express';
import cors from 'cors';
import db from './db.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// RUTA DE LOGIN
// ==========================================
app.post('/api/login', async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, proporcione el correo y la contraseña.'
      });
    }

    const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (!rows || rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas. El correo no está registrado.'
      });
    }

    const usuario = rows[0];

    let esValida = false;
    if (usuario.contrasena.startsWith('$2b$') || usuario.contrasena.startsWith('$2a$')) {
      esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    } else {
      esValida = (usuario.contrasena === contrasena);
    }

    if (!esValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas. La contraseña es incorrecta.'
      });
    }

    return res.status(200).json({
      success: true,
      message: '¡Inicio de sesión exitoso!',
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        id_rol: usuario.id_rol
      }
    });

  } catch (error) {
    next(error);
  }
});

// ==========================================
// RUTA PARA OBTENER TODOS LOS USUARIOS (GET)
// ==========================================
app.get('/api/usuarios', async (req, res, next) => {
  try {
    const [results] = await db.query('SELECT * FROM usuarios');
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// ==========================================
// RUTA PARA REGISTRAR UN USUARIO (POST)
// ==========================================
app.post('/api/usuarios', async (req, res, next) => {
  try {
    const { nombre, apellido, correo, contrasena, telefono, id_rol, documento } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, correo y contraseña son obligatorios.'
      });
    }

    const saltRounds = 10;
    const contrasenaHash = await bcrypt.hash(contrasena, saltRounds);

    const query = `
      INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, id_rol, documento) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [nombre, apellido, correo, contrasenaHash, telefono, id_rol || 2, documento || null]);
    
    res.status(201).json({
      success: true,
      mensaje: '¡Usuario registrado con éxito!',
      id_usuario: result.insertId
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// RUTA PARA ACTUALIZAR UN USUARIO (PUT)
// ==========================================
app.put('/api/usuarios/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, correo, id_rol, contrasena } = req.body;

    let query = '';
    let params = [];

    if (contrasena && contrasena.trim() !== '') {
      const contrasenaHash = await bcrypt.hash(contrasena, 10);
      query = 'UPDATE usuarios SET nombre = ?, correo = ?, id_rol = ?, contrasena = ? WHERE id_usuario = ?';
      params = [nombre, correo, id_rol, contrasenaHash, id];
    } else {
      query = 'UPDATE usuarios SET nombre = ?, correo = ?, id_rol = ? WHERE id_usuario = ?';
      params = [nombre, correo, id_rol, id];
    }

    await db.query(query, params);

    res.json({
      success: true,
      mensaje: 'Usuario actualizado correctamente.'
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// RUTA PARA ELIMINAR UN USUARIO (DELETE)
// ==========================================
app.delete('/api/usuarios/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    
    res.json({
      success: true,
      mensaje: 'Usuario eliminado correctamente.'
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// RUTAS DE ASISTENCIA Y CLIENTES (CORREGIDAS)
// ==========================================

// Buscar cliente por documento en la tabla 'usuarios' y 'membresias_clientes'
app.get('/api/clientes/documento/:doc', async (req, res, next) => {
  try {
    const { doc } = req.params;
    const query = `
      SELECT 
        u.id_usuario AS id_cliente, 
        u.nombre, 
        u.correo AS email, 
        u.documento, 
        mc.estado, 
        mc.fecha_fin AS vence
      FROM usuarios u
      LEFT JOIN membresias_clientes mc ON u.id_usuario = mc.id_cliente
      WHERE u.documento = ?
    `;
    const [rows] = await db.query(query, [doc]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado.' });
    }

    res.json({ success: true, cliente: rows[0] });
  } catch (err) {
    next(err);
  }
});

// Obtener ingresos de hoy desde la tabla 'asistencias'
app.get('/api/asistencia/hoy', async (req, res, next) => {
  try {
    const query = `
      SELECT a.id_asistencia, a.fecha_hora AS hora, u.nombre, u.correo AS email, u.documento
      FROM asistencias a
      JOIN usuarios u ON a.id_cliente = u.id_usuario
      WHERE DATE(a.fecha_hora) = CURDATE()
      ORDER BY a.fecha_hora DESC
    `;
    const [rows] = await db.query(query);
    res.json({ success: true, historial: rows });
  } catch (err) {
    next(err);
  }
});

// Registrar nuevo ingreso en la tabla 'asistencias'
app.post('/api/asistencia', async (req, res, next) => {
  try {
    const { id_cliente } = req.body;
    if (!id_cliente) {
      return res.status(400).json({ success: false, message: 'ID de cliente requerido.' });
    }

    const query = 'INSERT INTO asistencias (id_cliente, fecha_hora) VALUES (?, NOW())';
    await db.query(query, [id_cliente]);

    res.status(201).json({ success: true, message: 'Ingreso registrado correctamente.' });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// MIDDLEWARE GLOBAL DE MANEJO DE ERRORES
// ==========================================
app.use((err, req, res, next) => {
  console.error('❌ Error no controlado detectado:', err.message);
  res.status(500).json({
    success: false,
    message: 'Ocurrió un error en el servidor. El sistema sigue en marcha.'
  });
});

process.on('uncaughtException', (error) => {
  console.error('⚠️ Excepción de proceso capturada:', error.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Promesa no manejada capturada:', reason);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});