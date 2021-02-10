let socket = io();


socket.on("connect", client => {
    console.log("Conectado al servidor");
});


socket.on("disconnect", client => {
    console.log("Desconectado del servidor");
});

//variable boton y label
const ticketnext = document.querySelector("#lblNuevoTicket");
const generar = document.querySelector("#generar-ticket");

//Escribir en el label al iniciar session en la pagina
socket.on("ticketUltimo", data => {
    ticketnext.textContent = data.ultimo;
});

//COdigo para mostrar el ticket siguiente al presionar el boton
generar.addEventListener("click", () => {
    socket.emit("siguienteTicket", null, function(siguienteTicket){
        ticketnext.textContent = siguienteTicket;
    });
});