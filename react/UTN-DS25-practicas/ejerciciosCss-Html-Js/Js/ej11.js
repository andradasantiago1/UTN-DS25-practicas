/*Crear una función que reciba el monto de un producto, y el medio de pago: C (tarjeta de crédito), E (efectivo) y D (tarjeta de débito). 
Si el monto del producto es menor a $200 no se aplicará ningún descuento, pero si el monto a abonar es entre $200 y $400 se aplicará un descuento del 30% si el medio de pago es efectivo, 20% si se realiza con débito y 10% con tarjeta de crédito. 
Para montos mayores a $400, el descuento es el mismo sin importar el medio de pago, dicho descuento es del 40%. */

function importe(monto, met){
    let desc = 0;
    let mototot = monto;
    if(monto < 200){
        //s/ descuento
    }else if(monto >=200 && monto <= 400){
        switch (met){ 
            case 'E':
                desc = 0.3; // efectivo
                break;
            case 'D':
                desc = 0.2; //debito
                break;
            case 'C':
                desc = 0.1;
                break;
            default:
                console.log(`Medio de pago inválido. Efectivo (E) / Débito (D) / Crédito (C)`);
        }
    }else if(monto > 400){
        desc = 0.4;
    }
    montotot = monto - (monto * desc);
    console.log(`Importe: ${montotot}`);
}

let mont = 200;
let metodo = "E";
console.log(importe(mont,metodo));
