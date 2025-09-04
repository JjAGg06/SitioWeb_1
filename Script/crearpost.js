function crearPost() {
    event.preventDefault();

    const form = document.getElementById("formPost");
    const formData = new FormData(form);

    fetch("http://localhost/server_sw1/crearpost.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.estado === "ok") {
            alert("Post publicado correctamente");
            form.reset();
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => {
        console.error("Error al publicar:", error);
        alert("Error de conexión con el servidor.");
    });
}