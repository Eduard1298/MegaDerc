const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));   // sirve los HTML directamente

const DB_FILE = "db.json";

// ──────────────────────────────────────────────
// Helpers DB
// ──────────────────────────────────────────────

/**
 * Lee la base de datos almacenada en db.json.
 * Si el archivo no existe, crea una estructura inicial.
 *
 * @returns {Object} Objeto con usuarios, citas, reseñas y notificaciones.
 */

function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        const init = { users: [], citas: [], reseñas: [], notifs: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
        return init;
    }
    return JSON.parse(fs.readFileSync(DB_FILE));
}

/**
 * Guarda la información actualizada en la base de datos.
 *
 * @param {Object} data - Datos que se almacenarán en db.json.
 * @returns {void}
 */

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ──────────────────────────────────────────────
// USUARIOS
// ──────────────────────────────────────────────

// Registro

/**
 * Registra un nuevo usuario.
 *
 * Endpoint: POST /register
 *
 * Body:
 * {
 *   nombre: string,
 *   email: string,
 *   password: string
 * }
 *
 * Respuesta:
 * {
 *   ok: boolean
 * }
 */

app.post("/register", (req, res) => {
    const db = readDB();
    const { email } = req.body;

    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ ok: false, msg: "El correo ya está registrado" });
    }

    db.users.push({ ...req.body, foto: "" });
    saveDB(db);
    res.json({ ok: true });
});

// Login

/**
 * Inicia sesión verificando correo y contraseña.
 *
 * Endpoint: POST /login
 *
 * Body:
 * {
 *   email: string,
 *   password: string
 * }
 *
 * Respuesta:
 * {
 *   ok: boolean,
 *   user?: Object
 * }
 */

app.post("/login", (req, res) => {
    const db = readDB();
    const user = db.users.find(u =>
        u.email === req.body.email && u.password === req.body.password
    );
    if (user) res.json({ ok: true, user });
    else res.status(401).json({ ok: false, msg: "Credenciales incorrectas" });
});

// Actualizar perfil
/**
 * Actualiza la información de un usuario.
 *
 * Endpoint: PUT /users/:email
 *
 * @param {string} email - Correo del usuario.
 */

app.put("/users/:email", (req, res) => {
    const db = readDB();
    const idx = db.users.findIndex(u => u.email === req.params.email);
    if (idx === -1) return res.status(404).json({ ok: false });
    db.users[idx] = { ...db.users[idx], ...req.body };
    saveDB(db);
    res.json({ ok: true });
});

// ──────────────────────────────────────────────
// CITAS
// ──────────────────────────────────────────────

// Crear cita

/**
 * Crea una nueva cita médica.
 *
 * Endpoint: POST /citas
 *
 * Además genera automáticamente una notificación
 * asociada al usuario.
 */

app.post("/citas", (req, res) => {
    const db = readDB();
    const cita = { ...req.body, id: Date.now() };
    db.citas.push(cita);
    saveDB(db);

    // Crear notificación automática
    db.notifs = db.notifs || [];
    db.notifs.push({
        email: req.body.email,
        texto: `✅ Cita agendada: ${req.body.tratamiento} el ${req.body.fecha} a las ${req.body.hora}`,
        tipo: "ok",
        hora: new Date().toLocaleTimeString("es-CO"),
        leida: false,
        createdAt: new Date().toISOString()
    });
    saveDB(db);
    res.json({ ok: true, cita });
});

// Listar citas (filtrar por email opcional)

/**
 * Obtiene todas las citas.
 *
 * Endpoint: GET /citas
 *
 * Query opcional:
 * ?email=usuario@correo.com
 *
 * Si se envía email, retorna únicamente
 * las citas asociadas a ese usuario.
 */

app.get("/citas", (req, res) => {
    const db = readDB();
    const { email } = req.query;
    const citas = email ? db.citas.filter(c => c.email === email) : db.citas;
    res.json(citas);
});

// Modificar cita

/**
 * Modifica una cita existente.
 *
 * Endpoint: PUT /citas/:id
 *
 * @param {number} id - Identificador de la cita.
 */

app.put("/citas/:id", (req, res) => {
    const db = readDB();
    const idx = db.citas.findIndex(c => c.id == req.params.id);
    if (idx === -1) return res.status(404).json({ ok: false });
    db.citas[idx] = { ...db.citas[idx], ...req.body };
    saveDB(db);
    res.json({ ok: true });
});

// Cancelar cita

/**
 * Elimina una cita registrada.
 *
 * Endpoint: DELETE /citas/:id
 *
 * @param {number} id - Identificador de la cita.
 */

app.delete("/citas/:id", (req, res) => {
    const db = readDB();
    const idx = db.citas.findIndex(c => c.id == req.params.id);
    if (idx === -1) return res.status(404).json({ ok: false });
    db.citas.splice(idx, 1);
    saveDB(db);
    res.json({ ok: true });
});

// ──────────────────────────────────────────────
// RESEÑAS
// ──────────────────────────────────────────────

// Crear reseña

/**
 * Registra una nueva reseña.
 *
 * Endpoint: POST /reseñas
 *
 * Genera automáticamente la fecha de creación.
 */

app.post("/reseñas", (req, res) => {
    const db = readDB();
    db.reseñas = db.reseñas || [];
    db.reseñas.push({ ...req.body, id: Date.now(), fecha: new Date().toLocaleDateString("es-CO") });
    saveDB(db);
    res.json({ ok: true });
});

// Listar reseñas
/**
 * Obtiene todas las reseñas almacenadas.
 *
 * Endpoint: GET /reseñas
 */

app.get("/reseñas", (req, res) => {
    const db = readDB();
    res.json(db.reseñas || []);
});

// ──────────────────────────────────────────────
// NOTIFICACIONES
// ──────────────────────────────────────────────

// Listar notifs por usuario

/**
 * Obtiene las notificaciones de un usuario.
 *
 * Endpoint: GET /notifs/:email
 *
 * @param {string} email - Correo del usuario.
 */

app.get("/notifs/:email", (req, res) => {
    const db = readDB();
    const notifs = (db.notifs || []).filter(n => n.email === req.params.email);
    res.json(notifs);
});

// Marcar como leída

/**
 * Marca una notificación como leída.
 *
 * Endpoint: PUT /notifs/:id/leida
 *
 * @param {number} id - Identificador de la notificación.
 */

app.put("/notifs/:id/leida", (req, res) => {
    const db = readDB();
    const n = (db.notifs || []).find(n => n.id == req.params.id);
    if (n) n.leida = true;
    saveDB(db);
    res.json({ ok: true });
});

// ──────────────────────────────────────────────
// START
// ──────────────────────────────────────────────

/**
 * Inicializa el servidor Express.
 *
 * Puerto:
 * - Variable de entorno PORT.
 * - 3000 por defecto.
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ MegaDerc server corriendo en http://localhost:${PORT}`);
    console.log(`   → Abrir en navegador: http://localhost:${PORT}/index.html`);
});
