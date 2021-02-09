const fs = require("fs");

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketCreado{

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let tickets = [];
        let ultimos4 = [];

        let data = require("../data/data.json");
        if( this.hoy === data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarTicket();
        }
    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    ticketUltimo(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return "No hay tickets...";
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift( atenderTicket );

        if( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1, 1);
        }

        console.log( this.ultimos4 );

        this.grabarArchivo();

        return  atenderTicket;
    }

    reiniciarTicket(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo(){
        let info =  JSON.stringify({ 
            ultimo: this.ultimo, 
            hoy: this.hoy, 
            tickets: this.tickets,
            ultimos4: this.ultimos4
        });
        fs.writeFileSync("./server/data/data.json", info);
    }

}

module.exports = {
    TicketCreado
}