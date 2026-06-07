# MegaDerc — Plataforma Dermatológica Hiperlocal

Plataforma digital que conecta pacientes con un consultorio dermatológico,
facilitando citas, productos y servicios especializados.

---

## 📖 Descripción del Proyecto

La **Plataforma Hiperlocal para Servicios Dermatológicos - MegaDerc ** es una aplicación web desarrollada para facilitar la interacción entre pacientes y profesionales de la dermatología dentro de una comunidad local.

La solución integra en un único entorno digital funcionalidades clave para la gestión de servicios dermatológicos, permitiendo a los usuarios:

- 👤 Registrarse e iniciar sesión.
- 📅 Gestionar citas dermatológicas.
- 🧴 Consultar servicios especializados.
- 💊 Visualizar productos dermatológicos.
- 📱 Acceder a información centralizada desde una interfaz intuitiva.
- 🤝 Fortalecer la conexión entre pacientes y especialistas locales.

Esta propuesta se alinea con la línea de **Conexión Local — Economías Locales**, promoviendo el acceso a servicios cercanos, confiables y adaptados a las necesidades de cada usuario.

---

## 🎯 Objetivos del Sistema

### Objetivo General

Desarrollar una plataforma digital hiperlocal que facilite el acceso, gestión y promoción de servicios dermatológicos mediante herramientas tecnológicas que mejoren la experiencia del usuario.

### Objetivos Específicos

- Permitir el registro y autenticación de usuarios.
- Facilitar la gestión de citas dermatológicas.
- Centralizar la información de servicios y productos.
- Mejorar la comunicación entre pacientes y especialistas.
- Impulsar la economía local mediante la promoción de servicios cercanos.

---

## 🏗️ Arquitectura General del Sistema

La aplicación está diseñada bajo una arquitectura de tres capas:

### 🎨 Frontend

Responsable de la interacción con el usuario.

Funciones principales:

- Inicio de sesión.
- Registro de usuarios.
- Recuperación de contraseña.
- Dashboard principal.
- Consulta de citas.
- Visualización de productos y servicios.

Tecnologías:

- HTML5
- CSS3
- JavaScript

---

### ⚙️ Backend

Responsable de la lógica del negocio y procesamiento de solicitudes.

Funciones principales:

- Validación de usuarios.
- Gestión de autenticación.
- Administración de citas.
- Comunicación con la base de datos.

Tecnologías:

- Python
- Flask

---

### 🗄️ Base de Datos

Responsable del almacenamiento persistente de la información.

Tecnología:

- MongoDB Atlas

#### Productos

```json
{
  "nombre": "Protector Solar",
  "descripcion": "FPS 50+",
  "precio": 45000
}
```

---

## 📊 Diagrama de Arquitectura

```text
┌─────────────────────────┐
│        Usuario          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Frontend         │
│     HTML • CSS • JS     │
└────────────┬────────────┘
             │ HTTP
             ▼
┌─────────────────────────┐
│       Flask API         │
│   Lógica de Negocio     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      MongoDB Atlas      │
│      Base de Datos      │
└─────────────────────────┘
```

---

## 💻 Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| HTML5 | Estructura de la aplicación |
| CSS3 | Diseño y estilos |
| JavaScript | Interactividad del cliente |
| Python | Desarrollo backend |
| Flask | Framework web |
| MongoDB Atlas | Base de datos NoSQL |
| PyMongo | Conector MongoDB |
| Flask-CORS | Comunicación entre cliente y servidor |
| Git | Control de versiones |
| GitHub | Gestión del repositorio |

---

## ⚙️ Guía de Instalación

### Requisitos Previos

- Python 3.10 o superior
- Visual Studio Code
- MongoDB Atlas
- Git
- Navegador web moderno

---

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Eduard1298/MegaDerc/tree/main
```

### 2️⃣ Ingresar al proyecto

```bash
cd plataforma-dermatologica
```

### 3️⃣ Crear entorno virtual

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / Mac:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

O manualmente:

```bash
pip install flask
pip install pymongo
pip install flask-cors
```

### 5️⃣ Configurar MongoDB

En el archivo:

```python
app.py
```

Configurar la cadena de conexión:
```

---

## 🚀 Ejecución Local

### Iniciar el servidor Flask

```bash
python app.py
```

### Abrir la aplicación

Abrir:

```text
index.html
```

o utilizar la extensión **Live Server** de Visual Studio Code.

---

## 🧪 Pruebas del Sistema

El proyecto contempla pruebas unitarias para validar la calidad y funcionamiento de los componentes principales.

### Objetivos de Calidad

- Cobertura mínima del 85%.
- Validación de autenticación.
- Validación de registro.
- Validación de recuperación de contraseña.
- Validación de gestión de citas.

### Herramientas

- Pytest
- Pytest-Cov

### Ejecutar pruebas

```bash
pytest
```

### Generar reporte de cobertura

```bash
pytest --cov=app tests/
```

### Generar reporte HTML

```bash
pytest --cov=app --cov-report=html tests/
```

---

## 📂 Estructura del Proyecto

```text
plataforma-dermatologica/
│
├── index.html
├── dashboard.html
├── styles.css
├── script.js
├── app.py
│
├── tests/
│   └── test_app.py
│
├── requirements.txt
└── README.md
```

---

## 👨‍💻 Autores

**Natalia y Eduard**

Proyecto desarrollado para la materia **Proyecto de software - Ingeniería de Software - **.

---