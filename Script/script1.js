function operar(){
    const texto1 = document.getElementById("num1").value;
    const texto2 = document.getElementById("num2").value;
    if(texto1 !="" && texto2 !=""){
        const selectElement = document.getElementById("signo");
        let signo = selectElement.ariaValueMax;
        let num1 = Number(texto1);
        let num2 = Number(texto2);

        let respuesta = operacion(num1, num2, signo);
        alert("La respuesta es: "+respuesta);
    }
}

function operacion(num1, num2, signo){
    switch(signo){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num2 != 0 ? num1 / num2 : "Error, Division por cero";
    }
}

const selectElement = document.getElementById("signo");
selectElement.addEventListener("change", function(){
    const resultado = document.getElementById("lblOperacion");
    const valorSeleccionado = signoOperacion(selectElement.value);
    resultado.textContent = valorSeleccionado;
})

function SignoOperacion(signo){
    switch(signo){
        case "+":
            return "Suma";
        case "-":
            return "Resta";
        case "*":
            return "Multiplicacion";
        case "/":
            return "Division";
    }
}