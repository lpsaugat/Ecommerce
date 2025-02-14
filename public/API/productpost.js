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

function orderUpdate(orderID, quantity) {
  console.log(orderID, "id");
  fetch(`http://${ipAddress}:3000/dashboard/orders`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: orderID,
      quantity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Do something with the response data
    })

    .catch((error) => {
      console.log();
      console.error(error);
    });
}

function deleteOrder(orderID) {
  fetch(`http://${ipAddress}:3000/dashboard/orders/${orderID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return fetch(`http://${ipAddress}:3000/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => (window.location.href = response.url))
          .then((data) => {})
          .catch((error) => {
            console.log();
            console.log(error);
          });
      }
    })

    .then((data) => {})

    .catch((error) => {
      console.log();
      console.log(error);
    });
}

function addedtocartSingle(element, productID, price) {
  console.log(productID, "id");
  fetch(`http://${ipAddress}:3000/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productID,
      quantity: quantitybox[0].value,
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
