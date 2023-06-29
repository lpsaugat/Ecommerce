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

      popUpImage.src = productImage;
      popUpViewDetail.href = `/product/${productID}`;

      popUpName.textContent = productName;
      popUpDescription.textContent = productDesc;
      popUpPrice.textContent = productPrice;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
