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

let getEmpleado = id => {
    return new Promise( ( resolve, reject ) => {
        let empleadoDB = empleados.find( empleado => empleado.id === id);

        if( !empleadoDB ){
            reject("El empleado no existe");
        }else{
            resolve(empleadoDB);
        }
    });
}

let getSalario = empleado => {
    return new Promise( ( resolve, reject ) => {

        let salarioEmpleado = sueldo.find( salario => salario.id === empleado.id );
        
        if( !salarioEmpleado ){
            reject(`El empleado ingresado no tiene un salario ${empleado.nombre}`);
        }else{
            resolve({
                nombre : empleado.nombre,
                salario : salarioEmpleado.salario
            });
        }

    });
}

getEmpleado(3) 
    .then( resolve => getSalario( resolve ) )
    .then( respuesta => console.log( respuesta ) )
    .catch( error => console.log( error ) )

