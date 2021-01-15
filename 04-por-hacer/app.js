const { argv } = require("./config/yargs");
const { crear, listarDB } = require("./por-hacer/por-hacer");
const colors = require("colors");

//console.log(argv.descripcion);

switch (argv._[0]) {
    case "crear":
        crear(argv.descripcion);
        break;
    case "listar":
        let tareas = listarDB();
        tareas.forEach( lista => {
            console.log("==========Listado Tarea=======".green);
            console.log(lista.descripcion);
            console.log(`Estado: ${lista.completado}`);
            console.log("==============================".green);
        });
        break;
    case "actualizar":
        console.log("Actualizando productos");
        break;
    default:
        break;
}