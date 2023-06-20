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
  console.log(element.products[0]);
  for (let i = 0; i < element.products.length; i++) {
    cartAllProducts(element.products[i], 1, 0);
    console.log(element.products[i]);
  }
}
