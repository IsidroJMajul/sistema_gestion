// Manejo formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event){event.preventDefault(); // Prevenir el envío del formulario

  // Capturar los valores de los campos
  const dniSubmit = document.getElementById('dni_input').value;
  const passwordSubmit = document.getElementById('pass_input').value;

  console.log('DNI:', dniSubmit);
  console.log('Password:', passwordSubmit);

  // Crear un objeto con los datos
  const dataSubmit = { dni: dniSubmit, password: passwordSubmit };

  // Enviar los datos a la API usando fetch
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSubmit)
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

const logout = async () => {
  await fetch('http://localhost:5000/login', { method: 'POST' });
  // modificar porque redirige sin importar que haya un usuario logueado
  window.location.href = './pages/actions.html';
};