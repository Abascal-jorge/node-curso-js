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

let mostrarEmpleado = async id => {

    let empleadoDB = empleados.find(empleado => empleado.id === id);

    if(!empleadoDB){
        throw new Error("El empleado no existe");
    }else{
        return empleadoDB;
    }

}

let mostrarSalario = async empleado => {

    let salarioDB = sueldo.find( res => res.id === empleado.id );
     
    if( !salarioDB ){
        throw new Error("El empleaod no tiene un salario disponible");
    }else{
        return {
            nombre : empleado.nombre,
            salario : salarioDB.salario
        }
    }

}

let resultado = async () => {

    let empleado = await mostrarEmpleado(1);
    let objetoEmpleado = await mostrarSalario(empleado);

    return objetoEmpleado;
}

resultado()
    .then( res => console.log( res ) )