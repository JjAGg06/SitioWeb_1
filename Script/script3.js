let contadorEncuestas = 0;

function enviarEncuesta() {
    const form = document.getElementById('formEncuesta');
    const respuestasLista = document.getElementById('respuestas');
    const contadorSpan = document.getElementById('contador');

    const data = new FormData(form);
    let resumen = document.createElement('li');
    resumen.innerHTML = "<strong>Encuesta #" + (contadorEncuestas + 1) + ":</strong><br>";

    for (let [clave, valor] of data.entries()) {
        if (resumen.innerHTML.includes(clave)) continue; // Evita repetidos de checkboxes
        if (clave === 'preg4') {
            // Obtener todos los checkboxes seleccionados
            let checks = Array.from(document.querySelectorAll('input[name="preg4"]:checked')).map(cb => cb.value);
            resumen.innerHTML += `• Medio de transporte: ${checks.join(", ")}<br>`;
        } else {
            resumen.innerHTML += `• ${clave}: ${valor}<br>`;
        }
    }

    contadorEncuestas++;
    contadorSpan.textContent = contadorEncuestas;
    respuestasLista.appendChild(resumen);

    form.reset();
}