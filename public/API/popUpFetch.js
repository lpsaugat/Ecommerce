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
      const productPrice = data.popUp.price.$numberDecimal;
      console.log(productPrice);
      var popUpName = document.getElementById("popUpName");
      var popUpPrice = document.getElementById("popUpPrice");
      var popUpDescription = document.getElementById("popUpDescription");

      popUpName.textContent = productName;
      popUpDescription.textContent = productDesc;
      popUpPrice.textContent = productPrice;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
