const { argv } = require("./config/yargs");
const { crear } = require();

console.log(argv.descripcion);

switch (argv._[0]) {
    case "crear":
        
        break;
    case "listar":
        console.log("Listando tareas");
        break;
    case "actualizar":
        console.log("Actualizando productos");
        break;
    default:
        break;
}