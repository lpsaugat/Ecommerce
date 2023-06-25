var productImage = document.getElementsByClassName("product-image");
var imageBorder = document.getElementsByClassName("imageBorder");
function imageChange(element) {
  for (var i = 0; i < 3; i++) {
    if (element != i) {
      productImage[i].style.display = "none";
      imageBorder[i].style.borderColor = "#c4c4c4";
    } else {
      productImage[i].style.display = "flex";
      imageBorder[i].style.borderColor = "#182b3c";
    }
  }
}
