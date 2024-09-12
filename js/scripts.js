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
      // Log exitoso, guardar los datos del usuario en sessionStorage
      sessionStorage.setItem('dni', data.dni);
      sessionStorage.setItem('mail', data.mail);

      //entonces, lo que se devuelve como respuesta, queda guardado en el parámetro "data" 
      console.log('Response data:', data);
      // cuando se inicia la sesión aparece usuario: "undefined"
      alert(`Login exitoso. Bienvenido, ${data.username}`);

      // Una vez hecho el LOGIN EXITOSO, redirigir al usuario a otra página, por ejemplo:
      window.location.href = './pages/actions.html';
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
  // Verificar si hay un usuario logueado (guardado en sessionStorage)
  const dni = sessionStorage.getItem('dni');
  const mail = sessionStorage.getItem('mail');

  if (!dni || !mail) {
    // Si no hay usuario guardado, mostrar alerta y no realizar ninguna acción
    alert("No se puede cerrar sesión porque no hay usuario logueado");
    return;
  }

  try {
    // Realizar la solicitud de logout si el usuario está logueado
    const response = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluir cookies en la solicitud de logout
    });

    const data = await response.json();

    // Si la solicitud fue exitosa
    if (data.success) {
      // Remover los datos de sessionStorage
      sessionStorage.removeItem('dni');
      sessionStorage.removeItem('mail');
      
      // Redirigir a la página principal
      alert("Sesión cerrada exitosamente");
      window.location.href = './index.html';
    } else {
      // Mostrar un mensaje de error si no se pudo cerrar sesión
      alert("Error al intentar cerrar sesión: " + data.message);
    }
  } catch (error) {
    // Mostrar mensaje en caso de error con la solicitud
    console.error("Error en la solicitud de logout:", error);
    alert("Ocurrió un error al intentar cerrar sesión.");
  }
};