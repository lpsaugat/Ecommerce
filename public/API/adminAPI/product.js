const addProduct = document.querySelector("#addProduct");
const updateProduct = document.querySelector("#updateProduct");

if (addProduct) {
  addProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addProduct);
    const name = formData.get("name");
    const price = formData.get("price");
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
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  });
}
