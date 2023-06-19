function cartAllProducts(productID, quantity, price) {
  fetch(`http://${ipAddress}:3000/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productID,
      quantity,
      price,
    }),
  });
}

function addToCartPackages(element) {
  for (let i = 0; i < element.length; i++) {
    cartAllProducts(element.product[i], 1, 100);
  }
}
