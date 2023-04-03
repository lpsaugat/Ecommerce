var quantitybox = document.getElementsByClassName("quantity");


function increase(d) {
    var a = 1;
    quantitybox[d].value++;

}    

function decrease(d) {
    if(quantitybox[d].value >= 1){
        quantitybox[d].value--;


}    
}
