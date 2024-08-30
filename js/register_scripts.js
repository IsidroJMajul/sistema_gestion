// Manejo del formulario de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const usernameRegister = document.getElementById('username').value;
    const dniRegister = document.getElementById('registerDni').value;
    const emailRegister = document.getElementById('email').value;
    const passwordRegister = document.getElementById('registerPassword').value;
  
    console.log('Usuario:', usernameRegister);
    console.log('DNI:', dniRegister);
    console.log('Email:', emailRegister);
    console.log('Password:', passwordRegister);
  
    const dataRegister = { username: usernameRegister, dni: dniRegister, email: emailRegister, password: passwordRegister };
  
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataRegister)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log(`Response data:`, data);
        alert(`Usuario registrado correctamente. Usuario: ${data.username} DNI: ${data.dni} Password: ${data.password} Email: ${data.email}`);
      } else {
        alert("Registro incorrecto. Intente nuevamente");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema con el registro');
    });
  });