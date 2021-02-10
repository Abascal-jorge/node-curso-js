const socket = io();
const ticketuno = document.querySelector("#lblTicket1");
const ticketdos = document.querySelector("#lblTicket2");
const tickettres = document.querySelector("#lblTicket3");
const ticketcuatro = document.querySelector("#lblTicket4");
const escritoriouno = document.querySelector("#lblEscritorio1");
const escritoriodos = document.querySelector("#lblEscritorio2");
const escritoriotres = document.querySelector("#lblEscritorio3");
const escritoriocuatro = document.querySelector("#lblEscritorio4");


const ticket = [ticketuno, ticketdos, tickettres, ticketcuatro];
const escritorio = [escritoriouno, escritoriodos, escritoriotres, escritoriocuatro];

socket.on("ticketUltimo", data => {
    //console.log(data.ultimos4);
    generarHTML(data.ultimos4);
});


socket.on("compartirUltimos", data => {
    //console.log(data.ultimos4);
    let audio = new Audio("audio/new-ticket.mp3");
    audio.play();
    generarHTML(data.ultimos4);
});

function generarHTML(ultimo4){
    ultimo4.forEach( ( datos, index ) => {
        ticket[index].textContent = `Ticket ${datos.numero}`;
        escritorio[index].textContent = `Escritorio ${datos.escritorio}`;
    });
}