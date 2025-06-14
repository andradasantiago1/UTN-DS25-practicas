//Crear una función, a partir de la lógica aplicada en ejercicio 3, que reciba dos valores y muestre cuál es el mayor. En caso de ser iguales, deberá indicarlo.
//idem 3.
function compararNum(num1,num2){ //def funcion
    if(num1 == num2){
        console.log(`Son iguales.`);
    }else{
        if(num1 > num2){
            console.log(`${num1} es mayor que ${num2}`);
        }else if(num1<num2){
            console.log(`${num2} es mayor que ${num1}`);
        }
    }
}
