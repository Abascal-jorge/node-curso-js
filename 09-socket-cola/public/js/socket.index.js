const escritorioInput = document.querySelector("#escritorio");
const formularioInput = document.querySelector("#formulario");

let datos = {
    escritorio: 0
}

myApp();

function myApp(){
    formularioInput.addEventListener("submit", enviarDatos);
    escritorioInput.addEventListener("input", llenarDatos);
}

function llenarDatos(e){
    datos.escritorio = e.target.value;
}

function enviarDatos(e){
    e.preventDefault();
    if(datos.escritorio === ""){
        return "Debes Ingresar Un Ticket";
    }

    console.log(datos);
}

