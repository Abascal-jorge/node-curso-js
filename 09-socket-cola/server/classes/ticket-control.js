const fs = require("fs");

class TicketCreado{

    constructor(){
        this.ticket = 1;
        this.hoy = new Date().getDate();

        this.reiniciarTicket();
    }


    reiniciarTicket(){
        let data = require("../data/data.json");

        if( this.hoy === data.hoy){
            console.log("Es el mismo dia");
        }else{
            let info =  JSON.stringify({ ultimo: this.ticket, hoy: this.hoy});
            fs.writeFileSync("./server/data/data.json", info);

            console.log("Ahora son correctos");
        }
    }
}

module.exports = {
    TicketCreado
}