// Mensajes motivadores
const motivationalMessages = [
    "Cada paso cuenta en la conservación, incluso recuperar tu contraseña.",
    "Proteger nuestros ecosistemas requiere persistencia. ¡Tú también!",
    "Como el río Salween, encontrarás tu camino de vuelta.",
    "La naturaleza se adapta, y tú también puedes recuperar tu acceso.",
    "Tu compromiso con el Corredor Ecológico es más fuerte que cualquier contraseña."
];

const motivationalMessageElement = document.getElementById('motivationalMessage');
const recoveryImage = document.getElementById('recoveryImage');
const recoveryForm = document.getElementById('recoveryForm');

// Cambiar mensaje motivacional cada 5 segundos
function changeMotivationalMessage() {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    motivationalMessageElement.textContent = randomMessage;
}

// Cambiar imagen
function changeRecoveryImage() {
    const imageNumber = Math.floor(Math.random() * 5) + 1;
    recoveryImage.src = `/Salween Ecologico/Recuperar Contraseña/icon/contrasena${imageNumber}.png`;
}


// Manejar envío del formulario
recoveryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('recoveryEmail').value;

    if (email) {
        alert(`Hemos enviado un enlace de recuperación a ${email}. \n\n¡Revisa tu bandeja de entrada!`);
    } else {
        alert('Por favor, ingresa un correo electrónico válido');
    }
});

// Cambiar imagen y mensaje cada 5 segundos
setInterval(changeMotivationalMessage, 5000);
setInterval(changeRecoveryImage, 5000);

// Inicializar con un mensaje y imagen aleatorios
changeMotivationalMessage();
changeRecoveryImage();