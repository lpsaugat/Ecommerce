function addedtocart(element, productID, quantity, price) {
  console.log(productID, "id");
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
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Do something with the response data
      element.querySelector(".added").style.display = "block";
    })

    .catch((error) => {
      console.log();
      console.error(error);
    });
}

function deleteProduct(productID) {
  console.log(productID);
  fetch(`http://${ipAddress}:3000/dashboard/orders/${productID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Do something with the response data
    })

    .catch((error) => {
      console.log();
      console.log(error);
    });
}
