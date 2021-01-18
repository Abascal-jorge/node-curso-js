const { argv } = require("./config/yargs");
const { crear, listarDB, actualizarDB, eliminarTarea } = require("./por-hacer/por-hacer");
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
        let respuesta = actualizarDB( argv.descripcion, argv.c );
        console.log(respuesta);
        break;
    case "borrar":
        let respuesta2 = eliminarTarea( argv.descripcion );
        console.log(respuesta2);
        break;
    default:
        break;
}