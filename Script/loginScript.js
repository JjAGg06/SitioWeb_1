function iniciosesion() {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    fetch("http://localhost/server_sw1/inicioSesion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "usuario=" + encodeURIComponent(usuario) + "&contrasena=" + encodeURIComponent(contrasena)
    })
    .then(response => response.json())
    .then(data => {
        comprobarRespuesta(data.estado);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function comprobarRespuesta(estado) {
    if (estado === "ok") {
        window.location.href = "../Pages/inicio.html";
    } else {
        alert("Inicio fallido, credenciales inválidas");
    }
}