// CAMBIAR VISTAS
function mostrarRegistro() {
    document.getElementById("loginDiv").classList.add("hidden");
    document.getElementById("registroDiv").classList.remove("hidden");
}

function mostrarLogin() {
    document.getElementById("registroDiv").classList.add("hidden");
    document.getElementById("loginDiv").classList.remove("hidden");
}

// REGISTRO
function registrar() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!nombre || !email || !password) {
        alert("Completa los campos");
        return;
    }

    const usuario = { nombre, email, password };

    localStorage.setItem(email, JSON.stringify(usuario));

    localStorage.setItem("sesion", email);

    window.location.href = "dashboard.html";
}

// LOGIN
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const data = localStorage.getItem(email);

    if (!data) {
        document.getElementById("error").innerText = "Usuario no existe";
        return;
    }

    const usuario = JSON.parse(data);

    if (usuario.password === password) {
        localStorage.setItem("sesion", email);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Contraseña incorrecta";
    }
}

// DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
    const sesion = localStorage.getItem("sesion");

    if (!sesion) {
        window.location.href = "index.html";
    } else {
        const usuario = JSON.parse(localStorage.getItem(sesion));
        document.getElementById("usuario").innerText = "Bienvenido, " + usuario.nombre;
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("sesion");
    window.location.href = "index.html";
}