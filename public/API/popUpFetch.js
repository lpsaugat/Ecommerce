function popUpFetch(element) {
  fetch("/popUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productID: element,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.popUp.name);
      const productName = data.popUp.name;
      const productDesc = data.popUp.description;
      const productImage = data.popUp.image;
      const productID = data.popUp._id;

      const productPrice = data.popUp.price.$numberDecimal;
      console.log(productPrice);
      var popUpName = document.getElementById("popUpName");
      var popUpPrice = document.getElementById("popUpPrice");
      var popUpDescription = document.getElementById("popUpDescription");
      var popUpImage = document.getElementById("popUpImage");
      var popUpViewDetail = document.getElementById("popUpViewDetail");
      var popUpAddedToCart = document.getElementById("popUpAddedToCart");
      popUpImage.src = productImage;
      popUpViewDetail.href = `/product/${productID}`;
      popUpAddedToCart.onclick = `popUpAddedToCart(${productID},1,${productPrice})`;
      popUpName.textContent = productName;
      popUpDescription.textContent = productDesc;
      popUpPrice.textContent = productPrice;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function popUpAddedToCart(productID, quantity, price) {
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
