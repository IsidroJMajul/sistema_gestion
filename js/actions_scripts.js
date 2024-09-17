
// Toma el "username" de lo ya guardado en el Session Storage
const username = sessionStorage.getItem('username');

// Cambia el AVATAR por las iniciales del usuario

// Al cargar la página, recuperar el nombre del Session Storage y generar el avatar
window.onload = function() {
  var name = username;
  if (name) {
      generateAvatar(name);
      var user_icon = document.getElementById("user_icon");
      console.log("Elemento user_icon encontrado:", user_icon); // Verifica si el elemento existe
      
      if (user_icon) {
          console.log("Cambiando el avatar...");
      } else {
          console.error("El elemento con id='user_icon' no se encontró.");
      }
  } else {
      alert("No se encontró ningún nombre de usuario. Redirigiendo...");
      window.location.href = "index.html"; // Volver a index si no hay nombre
  }
};

// Función que genera el avatar basándose en las iniciales del nombre
function generateAvatar(name) {
    var initials = name.split(' ').map(function(str) { 
      return str ? str[0].toUpperCase() : ""; 
      }).join('');

    console.log("Initials generadas:", initials); // Para verificar que las iniciales se generen correctamente

    var canvas = document.createElement('canvas');
    var radius = 30;
    var margin = 5;
    canvas.width = radius * 2 + margin * 2;
    canvas.height = radius * 2 + margin * 2;

    // Obtener el contexto para dibujar en el canvas
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(radius + margin, radius + margin, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = 'center';
    ctx.fillText(initials, radius + margin, radius * 4 / 3 + margin);

    // Convertimos el canvas en una URL de imagen y actualizamos el botón
    var avatarUrl = canvas.toDataURL();
    console.log("URL generada del avatar:", avatarUrl); // Verifica si la URL del avatar es correcta
    document.getElementById("user_icon").src = avatarUrl;
    

    // Aquí fuerzas la actualización del src
    // var avatarIcon = document.getElementById("avatarIcon");
    // if (avatarIcon) {
    //   avatarIcon.src = avatarUrl;
    //   avatarIcon.setAttribute("src", avatarUrl); // Forzamos la actualización del src
    // } else {
    //     console.error("El elemento con id='avatarIcon' no se encontró.");
    // }
    function updateAvatar() {
      var avatarIcon = document.getElementById('user_icon');
      if (avatarIcon) {
          // Crear una nueva imagen con las iniciales
        var imgElement = document.createElement('img');
        imgElement.src = avatarUrl;
        // imgElement.alt = `Avatar con iniciales ${userInitials}`;
        
        // Reemplazar el icono de FontAwesome con la imagen
        user_icon.replaceWith(imgElement);

        // avatarIcon.className = avatarUrl;
        // avatarIcon.setAttribute("src", avatarUrl)
        // avatarIcon.className.backgroundImage = `url(${avatarUrl})`; // Cambia el fondo del icono
        // avatarIcon.className.backgroundSize = 'cover'; // Asegúrate de que la imagen se ajuste al tamaño
      }
      
      // document.getElementById("user_icon").removeAttribute("class");
      // document.getElementById("user_icon").removeAttribute("aria-hidden");
    }
  updateAvatar(); // Llama a la función para actualizar el avatar
}



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
