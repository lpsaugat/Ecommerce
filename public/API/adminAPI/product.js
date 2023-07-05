const addProduct = document.querySelector("#addProduct");

if (addProduct) {
  addProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addProduct);
    const name = formData.get("name");
    const price = formData.get("price");
    const primaryImage = formData.get("primaryImage");
    const description = formData.get("description");
    const longDescription = formData.get("longDescription");

    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("price", price);
    requestBody.append("longDescription", longDescription);
    requestBody.append("description", description);

    // Append each image to the FormData object

    requestBody.append("image", primaryImage);

    console.log(requestBody);

    fetch(`http://${ipAddress}:3000/admindashboard/products`, {
      method: "POST",
      headers: {},
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
