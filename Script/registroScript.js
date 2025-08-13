function registrarUsuario() {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const usuario = document.getElementById("usuario").value;
    const fecha = document.getElementById("fecha").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const contrasena = document.getElementById("contrasena").value;

    const datos = new URLSearchParams();
    datos.append("nombre", nombre);
    datos.append("apellido", apellido);
    datos.append("usuario", usuario);
    datos.append("fecha", fecha);
    datos.append("correo", correo);
    datos.append("telefono", telefono);
    datos.append("contrasena", contrasena);

    fetch("http://localhost/server_sw1/registro.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: datos.toString()
    })
    .then(response => response.json())
    .then(data => {
        if (data.estado === "ok") {
            alert("Registro exitoso.");
            window.location.href = "../Pages/inicioSesion.html";
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => {
        console.error("Error al registrar:", error);
        alert("Error de conexión con el servidor.");
    });
}