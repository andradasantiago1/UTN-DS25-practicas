/*Crear una función que reciba un número que represente la altura de un medio-árbol. Deberá generar de manera escalonada el mismo. Ejemplo: si la altura es 5 deberá mostrar:
*
* *
* * *
* * * *
* * * * *

*/

function arbol(numero){
    let resultado = " ";
    for(let i = 0; i < numero; i++){
        resultado += "* ".repeat(i+1) + "\n" // hace q '*' se repita las i veces q va, dsp hace salto de linea
    }
    return resultado;
}
console.log(arbol(3));