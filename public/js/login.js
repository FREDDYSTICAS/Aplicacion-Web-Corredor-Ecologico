// Obtener referencias a los elementos del DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const contrasenaInput = document.getElementById('contrasena');

// Manejar el envío del formulario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validación básica del formulario
    if (!emailInput.value || !contrasenaInput.value) {
        mostrarMensaje('error', 'Por favor complete todos los campos');
        return;
    }

    if (!validarEmail(emailInput.value)) {
        mostrarMensaje('error', 'Por favor ingrese un email válido');
        return;
    }

    // Datos del formulario
    const formData = {
        email: emailInput.value,
        contrasena: contrasenaInput.value
    };

    console.log('Enviando datos al servidor:', formData);

    try {
        const response = await fetch('/validarLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log('Respuesta del servidor:', response);  // Verifica el objeto de respuesta

        const data = await response.json();
        console.log('Datos recibidos del servidor:', data);  // Verifica los datos JSON

        if (data.tipo === 'exito') {
            mostrarMensaje('exito', '¡Bienvenido! Iniciando sesión...');
            setTimeout(() => {
                window.location.href = '/inicio';
            }, 2000);
        } else {
            mostrarMensaje('error', data.mensaje || 'Error al iniciar sesión');
        }
    } catch (error) {
        mostrarMensaje('error', 'Error de conexión. Por favor intente más tarde');
        console.error('Error:', error);
    }
});

// Función para validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para mostrar mensajes
function mostrarMensaje(tipo, texto) {
    const mensajeDiv = document.getElementById('motivacion-mensaje');
    
    // Estilos base del mensaje
    mensajeDiv.style.display = 'block';
    mensajeDiv.style.animation = 'fadeIn 0.3s';
    
    // Configurar estilo según el tipo de mensaje
    if (tipo === 'exito') {
        mensajeDiv.style.backgroundColor = '#e8f5e9';
        mensajeDiv.style.color = '#27ae60';
        mensajeDiv.style.borderLeft = '4px solid #27ae60';
    } else {
        mensajeDiv.style.backgroundColor = '#ffebee';
        mensajeDiv.style.color = '#c62828';
        mensajeDiv.style.borderLeft = '4px solid #c62828';
    }
    
    // Agregar icono y texto
    mensajeDiv.innerHTML = `
        <i class="fas ${tipo === 'exito' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${texto}
    `;
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.style.opacity = '0';
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
            mensajeDiv.style.opacity = '1';
        }, 300);
    }, 3000);
}
