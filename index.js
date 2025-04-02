const express = require("express");
const mysql = require("mysql");
const path = require("path");
const router = express.Router();

let conexion = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Salween_Ecologico",
});

conexion.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
        process.exit(1); // Detener el servidor si no puede conectar a la base de datos
    }
    console.log("Conexión a la base de datos establecida");
});

const app = express();
const PORT = process.env.PORT || 8000;

// Configura EJS como motor de vistas y establece la carpeta de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Redirige la ruta raíz "/" al inicio.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "inicio.html"));
});

// Configura la carpeta "public" como carpeta estática
app.use(express.static(path.join(__dirname, "public")));

// Middleware para analizar JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para la página de inicio de sesión
app.get("/login", (req, res) => {
    res.render("login"); // Renderiza login.ejs
});

// Ruta para la página de registro
app.get("/registro", (req, res) => {
    res.render("registro"); // Renderiza registro.ejs
});


app.get("/formulario", (req, res) => {
    res.render("formulario");
});

app.get("/miperfil", (req, res) => {
    res.render("miperfil");
});


// Ruta para manejar el registro de usuario y guardar los datos en la base de datos
app.post("/validarRegistro", (req, res) => {
    const { nombre, email, contrasena } = req.body;

    let registrar = "INSERT INTO Usuarios (nombre, email, contrasena) VALUES (?, ?, ?)";
    conexion.query(registrar, [nombre, email, contrasena], (error, results) => {
        if (error) {
            console.error("Error al almacenar los datos:", error);
            res.status(500).send("Error al almacenar los datos");
        } else {
            console.log("Datos almacenados correctamente");
            res.redirect("/login"); // Redirige al login
        }
    });
});

// Ruta para manejar el login (verificación de credenciales)
app.post("/validarLogin", (req, res) => {
    const { email, contrasena } = req.body;

    let query = "SELECT * FROM Usuarios WHERE email = ?";
    conexion.query(query, [email], (error, results) => {
        if (error) {
            console.error("Error al verificar el login:", error);
            res.status(500).json({ mensaje: "Error al verificar el login", tipo: "error" });
        } else if (results.length > 0) {
            if (contrasena === results[0].contrasena) {
                console.log("Usuario autenticado correctamente");
                res.json({ mensaje: "¡Bienvenido! Iniciando sesión...", tipo: "exito" });
            } else {
                console.log("Credenciales incorrectas");
                res.json({ mensaje: "Correo o contraseña incorrectos", tipo: "error" });
            }
        } else {
            console.log("Credenciales incorrectas");
            res.json({ mensaje: "Correo o contraseña incorrectos", tipo: "error" });
        }
    });
});


// Ruta para manejar el registro de Ríos
app.post("/registroRio", (req, res) => {
    const { nombre_rio, descripcion_rio, longitud_rio, estado_rio, biodiversidad_rio, imagen_url_rio } = req.body;

    let query = "INSERT INTO Rios (nombre, descripcion, longitud, estado, biodiversidad, imagen_url) VALUES (?, ?, ?, ?, ?, ?)";
    conexion.query(query, [nombre_rio, descripcion_rio, longitud_rio, estado_rio, biodiversidad_rio, imagen_url_rio], (error, results) => {
        if (error) {
            console.error("Error al almacenar los datos del río:", error);
            res.status(500).json({ success: false, message: "Error al registrar el río." });
        } else {
            console.log("Río registrado correctamente");
            res.json({ success: true, message: "El río ha sido registrado exitosamente." });
        }
    });
});

// Ruta para manejar el registro de Proyectos
app.post("/registroProyecto", (req, res) => {
    const { nombre_proyecto, descripcion_proyecto, fecha_inicio, fecha_fin, estado_proyecto, imagen_url_proyecto } = req.body;

    let query = "INSERT INTO Proyectos (nombre, descripcion, fecha_inicio, fecha_fin, estado, imagen_url) VALUES (?, ?, ?, ?, ?, ?)";
    conexion.query(query, [nombre_proyecto, descripcion_proyecto, fecha_inicio, fecha_fin, estado_proyecto, imagen_url_proyecto], (error, results) => {
        if (error) {
            console.error("Error al almacenar los datos del proyecto:", error);
            res.status(500).json({ success: false, message: "Error al registrar el proyecto." });
        } else {
            console.log("Proyecto registrado correctamente");
            res.json({ success: true, message: "El proyecto ha sido registrado exitosamente." });
        }
    });
});

// Ruta para manejar el registro de Contacto
app.post("/registroContacto", (req, res) => {
    const { direccion, telefono, movil, email, web } = req.body;

    let query = "INSERT INTO Contacto (direccion, telefono, movil, email, web) VALUES (?, ?, ?, ?, ?)";
    conexion.query(query, [direccion, telefono, movil, email, web], (error, results) => {
        if (error) {
            console.error("Error al almacenar los datos de contacto:", error);
            res.status(500).json({ success: false, message: "Error al registrar la información de contacto." });
        } else {
            console.log("Información de contacto registrada correctamente");
            res.json({ success: true, message: "La información de contacto ha sido registrada exitosamente." });
        }
    });
});

conexion.query("SELECT * FROM Usuarios", (error, results) => {
    if (error) {
        console.error("Error en la consulta:", error);
    } else {
        console.log("Usuarios en la base de datos:", results);
    }
});

// Ruta para servir inicio.html
app.get("/inicio", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "inicio.html"));
});

// Iniciar el servidor en el puerto 8000
app.listen(PORT, () => {
    console.log(`Servidor creado en http://localhost:${PORT}`);
});
