/*Crear una función que reciba un número que indica el día de la semana y retorne una cadena de texto indicando a qué día corresponde. Ejemplo: si es 1, deberá retornar lunes, 2 retornará martes, y así siguiendo. Si el día es 6 o 7 deberá retornar “fin de semana”. En caso de un valor que no represente un día de la semana deberá retornar un mensaje de error.
*/ 

function dia(num){
    switch(num){
        case 1:
            return "lunes";
            break;
        case 2:
            return "martes";
            break;
        case 3:
            return "miercoles";
            break;
        case 4:
            return "lunes";
            break;
        case 5:
            return "lunes";
            break;
        case 6:
        case 7:
            return "fin de semana";
            break;
        default:
            return "Error. Debe ingresar un numerodel 1 al 7.";
        }
}

let numero = 3;
console.log(dia(numero));