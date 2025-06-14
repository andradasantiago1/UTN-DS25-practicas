//Crear una función que reciba un número y muestre tantos asteriscos como la cantidad de veces que se pasó como parámetro.
function asteriscos(numero){
    let resul = " "; //OJO, dejar espacio p/ indicar q esta vacio
    for(let i = 0; i < numero; i++){
        resul+="*";
    }
    console.log(resul);
}
console.log(asteriscos(2));