var quantitybox = document.getElementsByClassName("quantity");
var quantitybox2 = document.getElementsByClassName("quantity2");

function increase(d) {
  var a = 1;
  quantitybox[d].value++;
  quantitybox2[d].value++;
}

function decrease(d) {
  if (quantitybox[d].value >= 1) {
    quantitybox[d].value--;
  }
  if (quantitybox2[d].value >= 1) {
    quantitybox2[d].value--;
  }
}
