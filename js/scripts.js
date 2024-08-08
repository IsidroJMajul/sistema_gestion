// Conexión a base de datos MySQL

let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users_gestion"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.end()
});

con.connect(function(err) {
    // if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
    //   if (err) throw err;
      console.log(result);
    });
  });
  
/* PROXIMO PASO:
El usuario inserte los datos en los campos inputs y aprete el botón de INGRESAR
Al presionar el botón INGRESAR, el script deberá:
. conectarse a la base de datos
. buscar la información colocada en los inputs (dni y password) OK
. en caso de NO encontrar la información, aparecerá un alerta de ERROR y cerrará la conexión.
. en caso de SÍ encontrar la información, se dará ingreso a la plataforma y se cargará la siguiente página (por el momento, sólo marcará un alerta de ingreso correcto y cerrará la conexión)
*/

function valorDniPass() {
  let dni = document.getElementById('dni_input');
  let dniValue = dni.value;
  let pass = document.getElementById('pass_input');
  let passValue = pass.value;
  alert("DNI: " + dniValue + " " + "Password: " + passValue)
}
