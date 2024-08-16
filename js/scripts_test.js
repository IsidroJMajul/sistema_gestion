// Ejemplo de API en Node.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users_gestion"
});

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { dni, password } = req.body;

  const query = 'SELECT * FROM users WHERE dni = ? AND password = ?';
  db.query(query, [dni, password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });
});

app.listen(3000, () => {
  console.log('API funcionando en http://localhost:3000');
});

function valorDniPass() {
    let dni = document.getElementById('dni_input').value;
    let pass = document.getElementById('pass_input').value;
  
    // Hacer una solicitud POST a la API para verificar los datos
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dni: dni, password: pass }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Vamos!");
      } else {
        alert("DNI o contraseña incorrectos.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Hubo un problema con la verificación.");
    });
  }
  
  // Agregar el event listener al botón de ingresar
  document.getElementById('ingresar_btn').addEventListener('click', valorDniPass);
