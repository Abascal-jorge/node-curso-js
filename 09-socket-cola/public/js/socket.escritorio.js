let socket = io();

//Codigo para obtener el parametro de url 
let searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has("escritorio")){
    window.location = "index.html";
    throw new Error("El escritorio es necesario")
}

let escritorio = searchParams.get("escritorio");


//Mostrar el escritorio y el ticket utilizado
const atenderSmall = document.querySelector("h1");
const botonCambiar = document.querySelector("button");
const smallEtiqueta = document.querySelector("small");

atenderSmall.textContent = `Escritorio ${escritorio}`;

botonCambiar.addEventListener("click", () => {
    //console.log(escritorio);
    socket.emit("atenderTicket", { escritorio }, function(res){
        //console.log(res);
        if(res === "No hay tickets..."){
            smallEtiqueta.textContent = res;
            alert(resp);
            return "Debes mandar el ticket";
        }else{
            smallEtiqueta.textContent = res.numero;
        }
    });
});

