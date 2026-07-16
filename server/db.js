import mysql from 'mysql2';

// Crear la conexión con los datos de Laragon
const connection = mysql.createConnection({
  host: 'localhost',      // El servidor local que corre en Laragon
  user: 'root',           // Usuario por defecto de Laragon
  password: '',           // Contraseña vacía por defecto
  database: 'kingympro_db' // El nombre de la base de datos de tu proyecto
});

// Conectar y verificar si hay errores
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos de Laragon:', err.stack);
    return;
  }
  console.log('✅ ¡Conexión exitosa a la base de datos de KinGymPro en Laragon!');
});

export default connection;