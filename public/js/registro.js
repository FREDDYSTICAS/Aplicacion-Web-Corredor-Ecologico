document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const motivacionMensaje = document.getElementById("motivacion-mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita el envío del formulario para realizar la validación primero

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const contrasena = document.getElementById("contrasena").value;

        // Validación de campos vacíos
        if (!nombre || !email || !contrasena) {
            motivacionMensaje.style.display = "block";
            motivacionMensaje.textContent = "Todos los campos son obligatorios.";
            motivacionMensaje.style.backgroundColor = "#f8d7da";
            motivacionMensaje.style.color = "#721c24";
            return;
        }

        // Validación del formato de correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            motivacionMensaje.style.display = "block";
            motivacionMensaje.textContent = "Por favor, ingresa un correo electrónico válido.";
            motivacionMensaje.style.backgroundColor = "#f8d7da";
            motivacionMensaje.style.color = "#721c24";
            return;
        }

        // Validación de la contraseña (mínimo 6 caracteres)
        if (contrasena.length < 6) {
            motivacionMensaje.style.display = "block";
            motivacionMensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
            motivacionMensaje.style.backgroundColor = "#f8d7da";
            motivacionMensaje.style.color = "#721c24";
            return;
        }

        // Si todo está bien, mostrar mensaje de éxito
        motivacionMensaje.style.display = "block";
        motivacionMensaje.textContent = "Registrando usuario, por favor espera...";
        motivacionMensaje.style.backgroundColor = "#d4edda";
        motivacionMensaje.style.color = "#155724";

        // Esperar 2 segundos antes de enviar el formulario
        setTimeout(() => {
            form.submit(); // El formulario se envía después de 2 segundos
        }, 2000); // 2000 milisegundos = 2 segundos
    });
});
