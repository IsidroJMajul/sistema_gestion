// Toma el "username" de lo ya guardado en el Session Storage
const username = sessionStorage.getItem('username');

// Lógica para actualizar el mensaje de bienvenida
// Usamos directamente username para mostrar el nombre de usuario, ya que el valor obtenido de sessionStorage.getItem() es una cadena, no un objeto
document.getElementById('welcomeMessage').textContent = `¡Bienvenido/a, ${username}!`;

// Manejo del CIERRE DE SESIÓN
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
        sessionStorage.removeItem('username');
  
        
        // Redirigir a la página principal
        alert("Sesión cerrada exitosamente");
        window.location.href = '../index.html';
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