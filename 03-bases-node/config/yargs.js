const opts = {
    base: {
        demand: true,
        alias: "b"
    },
    limite: {
        default: 10,
        alias: "l"
    }
}

const argv = require("yargs")
             .command("listar", "Mostrar tablas por consola", opts)
             .command("crear", "Crear tabla en archivo txt", opts)
             .argv;

module.exports = {
    argv
}