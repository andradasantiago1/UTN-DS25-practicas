//Evaluar si dos números son iguales, diferentes, mayor o menor. Resolver utilizando “if”/”else”.
n1 = 7;
n2 = 5;


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

console.log(compararNum(n1,n2));