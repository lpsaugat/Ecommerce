const addProduct = document.querySelector("#addProduct");
const updateProduct = document.querySelector("#updateProduct");

if (addProduct) {
  addProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addProduct);
    const name = formData.get("name");
    const price = formData.get("price");
    var discountedFrom = formData.get("discountedFrom");
    if (discountedFrom === "") {
      discountedFrom = 0;
    }
    const primaryImage = formData.get("primaryImage");
    const otherImages = formData.getAll("otherImages");
    const description = formData.get("description");
    const longDescription = formData.get("longDescription");
    const categories = formData.get("category");
    const quantity = formData.get("quantity");
    const measure = formData.get("measure");
    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("price", price);
    requestBody.append("discountedFrom", discountedFrom);

    requestBody.append("longDescription", longDescription);
    requestBody.append("description", description);
    requestBody.append("quantity", quantity);
    requestBody.append("measure", measure);
    const allCategories = categories
      .split(",")
      .map((elements) => elements.trim());

    allCategories.forEach((category, index) => {
      requestBody.append("category", category);
    });
    // Append each image to the FormData object
    requestBody.append("image", primaryImage);
    for (i = 0; i < otherImages.length; i++) {
      requestBody.append("image", otherImages[i]);
    }

    fetch(`http://${ipAddress}:3000/admindashboard/products`, {
      method: "POST",
      body: requestBody,
    })
      .then((data) => {
        window.location.href = `http://${ipAddress}:3000/admindashboard/products/`;
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

if (updateProduct) {
  updateProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const productID = url.split("/").pop();
    console.log(productID);
    const formData = new FormData(updateProduct);
    const name = formData.get("name");
    const price = formData.get("price");
    var discountedFrom = formData.get("discountedFrom");
    console.log(discountedFrom);
    if (discountedFrom === "") {
      discountedFrom = 0;
    }
    const quantity = formData.get("quantity");
    const measure = formData.get("measure");

    const primaryImage = formData.get("primaryImage");
    const otherImages = formData.getAll("otherImages");
    const description = formData.get("description");
    const longDescription = formData.get("longDescription");
    const categories = formData.get("category");
    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("quantity", quantity);
    requestBody.append("measure", measure);

    requestBody.append("price", price);
    requestBody.append("discountedFrom", discountedFrom);

    requestBody.append("longDescription", longDescription);
    requestBody.append("description", description);
    const allCategories = categories
      .split(",")
      .map((elements) => elements.trim());

    allCategories.forEach((category, index) => {
      requestBody.append("category", category);
    });
    // Append each image to the FormData object

    if (primaryImage.size !== 0) {
      requestBody.append("image", primaryImage);
    }
    for (i = 0; i < otherImages.length; i++) {
      if (otherImages[i].size !== 0) {
        requestBody.append("image", otherImages[i]);
      }
    }
    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/products/${productID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((response) => (window.location.href = response.url))
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  });
}

var deleteProduct = document.getElementById("deleteProduct");

function deletefProduct() {
  deleteProduct.style.display = "block";
  document.body.style.overflow = "hidden";
}

function cancelfDeleteProduct() {
  deleteProduct.style.display = "none";
  document.body.style.overflow = "auto";
}

function adminDeleteProduct(productID) {
  fetch(`http://${ipAddress}:3000/admindashboard/products/${productID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) =>
        (window.location.href = `http://${ipAddress}:3000/admindashboard/products/`)
    )
    .then((data) => {})
    .catch((error) => {
      console.error(error);
    });
}
