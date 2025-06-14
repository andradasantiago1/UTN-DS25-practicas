/*Utilizando “switch”. Definir una variable numérica. Asignarle un valor entre 1 y 10; mostrar a qué grupo pertenece:
Grupo 1: del 1 al 3
Grupo 2: del 4 al 6
Grupo 3: del 7 al 10
Modifiquemos el ejercicio para que el número lo ingrese el usuario (con “prompt”).
*/

let num = 6; 

switch(num){
    case num >= 1 && num <= 3:
        console.log(`Se encuentra dentro del grupo 1.`);
        break;
    case num >=4 && num <=6:
        console.log(`Se encuentra dentro del grupo 2.`);
        break;
    case num >=7 && num <=10:
        ondeviceorientationabsolute.log(`Se encuentra dentro del grupo 3.`);
        break;
    default:
        console.log(`El numero ${num} no se encuentra en un rango del 1 al 10.`);
}