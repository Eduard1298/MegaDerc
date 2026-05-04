const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "db.json";

// leer datos
function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}

// guardar datos
function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// REGISTRO
app.post("/register", (req, res) => {
    const db = readDB();
    db.users.push(req.body);
    saveDB(db);
    res.send({ ok: true });
});

// LOGIN
app.post("/login", (req, res) => {
    const db = readDB();
    const user = db.users.find(u =>
        u.email === req.body.email &&
        u.password === req.body.password
    );

    if (user) res.send({ ok: true, user });
    else res.send({ ok: false });
});

// CREAR CITA
app.post("/citas", (req, res) => {
    const db = readDB();
    db.citas.push(req.body);
    saveDB(db);
    res.send({ ok: true });
});

// LISTAR CITAS
app.get("/citas", (req, res) => {
    res.send(readDB().citas);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});