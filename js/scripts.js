document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Capturar los valores de los campos
  const dni = document.getElementById('dni_input').value;
  const password = document.getElementById('pass_input').value;

  console.log('DNI:', dni);
  console.log('Password:', password);

  // Crear un objeto con los datos
  const data = { dni: dni, password: password };

  // Enviar los datos a la API usando fetch
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  //A partir de este punto, se maneja la respuesta del servidor "data"
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      //entonces, lo que se devuelve como respuesta, queda guardado en el parámetro "data" 
      console.log('Response data:', data);
      alert(`Login exitoso. Bienvenido, ${data.username}`);
      // Aquí podrías redirigir al usuario a otra página, por ejemplo:
      // window.location.href = '/dashboard.html';
    } else {
      alert('Credenciales incorrectas');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Hubo un problema con el login');
  });
});