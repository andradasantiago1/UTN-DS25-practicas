/*Generar un array con 10 números, recorrerlo e ir multiplicando todos los elementos, finalmente obtener el producto total.*/ 
array = [1,2,3,4,5,6,7,8,9,10];
let tot = 1;
for (let i = 0; i < array.length; i++){
    tot *= array[i];
}
console.log(tot);
