const usuario = {
    nombre : "Jorge",
    apellido : "Abascal",
    edad : 25,
    getNombre() {
        return `Bienvenido ${ this.nombre } ${this.apellido} con ${this.edad} años`;
    }
}

const { nombre, apellido, edad } = usuario;

console.log(`${nombre} ${apellido} ${edad}`);
const hola = usuario.getNombre();
console.log(hola);