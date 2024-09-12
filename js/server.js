// No hay que agregarlo al archivo HTML para que se ejecute, ya que se ejecuta desde la parte backend

// API Node.js (librerias "express", "body-parser" y "CORS")
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete CORS para que sean compatibles entre puertos diferentes (BD en 5000 y sitio web en 3000)
const crypto = require('crypto'); // Módulo para generar cadenas seguras

// Generar una cadena aleatoria segura
let secret = crypto.randomBytes(64).toString('hex'); // Genera 64 bytes de datos aleatorios en hexadecimal

// Imprimir el código secreto generado en la consola
console.log(`Código es: ${secret}`);

app.use(session({
  secret: secret, // Usamos la cadena generada como secreto
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 'secure: true' solo en HTTPS
}));

app.use(express.json());

// Configuración del middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:3000', // Cambiar al puerto de tu frontend
    credentials: true, // Habilitar el envío de cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));  

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
      req.session.userId = user.id; // Guardar el ID de usuario en la sesión
      res.json({
        success: true,
        username: user.username,
        dni: user.dni,
        mail: user.mail,
        message: 'Login exitoso'
      });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Manejo de cierre de sesión. No es necesario el manejo de sesión en el servidor para Session Storage
app.post('/logout', (req, res) => {
  // Solo enviar una respuesta de éxito al cliente
  res.json({ success: true, message: 'Sesión cerrada en el cliente' });
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { username, dni, email, password } = req.body;

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
  // console.log(`Secreto inicial: ${secret}`); // Solo para desarrollo
});
