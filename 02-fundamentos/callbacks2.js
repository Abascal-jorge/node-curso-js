const empleados = [
    {
        id: 1,
        nombre: "Jorge"
    },
    {
        id: 2,
        nombre: "Manuel"
    },
    {
        id: 3,
        nombre: "itzel"
    }
];

const sueldo = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }
];

let getEmpleado = (id, callback) => {

    let empleadoDB = empleados.find( empleado => empleado.id === id );

    if( !empleadoDB ){
        callback(`No existe un empleado con ID ${id}`);
    }else{
        callback(null, empleadoDB);
    }
}

/* Callback para mostrar sueldos*/

const getSueldo = (empleadoDB, callback) => {
    
    let sueldoEmpleado = sueldo.find( salario => salario.id === empleadoDB.id );
    let nuevoArray = {
        nombre : empleadoDB.nombre,
        suledo : sueldoEmpleado.salario
    }
    if( !sueldoEmpleado ){
        callback(`El empleado no cuenta con un salario aun`);
    }else{
        callback(null, nuevoArray);
    }

}

getEmpleado( 1, (error, empleadoDB) => {
    if(error){
        return console.log(error);
    }
    getSueldo(empleadoDB, (error, usuario) => {
        if(error){
            console.log(error);
        }
        console.log(usuario);
    });
});