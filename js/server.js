// No hay que agregarlo al archivo HTML para que se ejecute, ya que se ejecuta desde la parte backend

// API Node.js (librerias "express", "body-parser" y "CORS")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete CORS

// Configuración del middleware
app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'users_gestion'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para login
app.post('/login', (req, res) => {
  const { dni, password } = req.body;

  // Verificar credenciales en la base de datos
  const query = 'SELECT * FROM users WHERE dni = ? AND password = ?';
  db.query(query, [dni, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    if (results.length > 0) {
        const user = results[0];
        const mail = results[0];
    res.json({ success: true,
         username: user.username,
         mail: mail.mail,
         message: `Login exitoso` });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { username, dni, email, password } = req.body;
  // console.log("Correo recibido:", email); // Verifica que el mail se reciba correctamente

  // Primero verifica si el usuario ya existe
  const checkUserSql = 'SELECT * FROM users WHERE dni = ?';
  db.query(checkUserSql, [dni], (err, result) => {
    if (err) return res.status(500).send('Error en la base de datos');
    if (result.length > 0) {
      return res.status(400).send('El usuario ya existe');
    }

    // Si el usuario no existe, inserta el nuevo usuario
    const insertSql = 'INSERT INTO users (username, dni, mail, password) VALUES (?, ?, ?, ?)';
    db.query(insertSql, [username, dni, email, password], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
      res.json({ success: true, message: 'Usuario registrado con éxito', username, dni, email });
    });
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});