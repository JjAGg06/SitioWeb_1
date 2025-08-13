document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formEstudiante");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // que no se recargue carnal

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const edad = document.getElementById("edad").value;
        const genero = document.getElementById("genero").value;
        const carrera = document.getElementById("carrera").value.trim();
        const comentarios = document.getElementById("comentarios").value.trim();
        const terminos = document.getElementById("terminos").checked;

        if (!nombre || !correo || !edad || !genero || !carrera || !terminos) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        alert(`Estas registrado \n\nNombre: ${nombre}\nCorreo: ${correo}\nEdad: ${edad}\nGénero: ${genero}\nCarrera: ${carrera}\nComentarios: ${comentarios || "Ninguno"}`);
        
        formulario.reset(); // Limpiar
    });
});
