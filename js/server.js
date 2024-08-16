// API Node.js (librerias "express" y "body-parser")
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
      res.json({ success: true, message: 'Login exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});