function changeHeaderCount() {
  fetch("/cartCount")
    .then((response) => response.json())
    .then((data) => {
      // Retrieve the updated count from the response data
      const updatedCount = data.count;

      updateCartCount(updatedCount);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateCartCount(count) {
  var cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = count;
}

function changeTotal(element) {
  fetch("/cartCount")
    .then((response) => response.json())
    .then((data) => {
      // Retrieve the updated count from the response data
      const subTotal = data.subTotal;
      const eachTotal = data.eachTotal[element];
      var cartCounteachTotal1 = document.getElementById(`cartItem${element}`);
      var cartCounteachTotal2 = document.getElementById(`cartItem2${element}`);
      var cartCountsubTotal1 = document.getElementById("subTotal1");
      var cartCountsubTotal2 = document.getElementById("subTotal2");

      cartCounteachTotal1.textContent = eachTotal;
      cartCounteachTotal2.textContent = eachTotal;
      cartCountsubTotal1.textContent = subTotal;
      cartCountsubTotal2.textContent = subTotal;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
