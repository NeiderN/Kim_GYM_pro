import mysql from 'mysql2/promise';

// Crear un Pool de conexiones en lugar de una conexión única (Soporta promesas y reconexión)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kingympro_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Prueba de verificación inicial
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ ¡Conexión exitosa a la base de datos de KinGymPro en Laragon!');
    connection.release();
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos de Laragon:', err.message);
  }
})();

export default db;