const addPackage = document.querySelector("#addPackage");

if (addPackage) {
  addPackage.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addPackage);
    const name = formData.get("name");
    const price = formData.get("price");
    var discountedFrom = formData.get("discountedFrom");
    if (discountedFrom === "") {
      discountedFrom = 0;
    }
    const primaryImage = formData.get("primaryImage");
    const otherImages = formData.getAll("otherImages");
    const description = tinymce
      .get("descriptionTextArea")
      .getContent({ format: "html" });
    const longDescription = tinymce
      .get("longDescriptionTextArea")
      .getContent({ format: "html" });
    // const description = formData.get("description");
    // const longDescription = formData.get("longDescription");
    console.log(longDescription);
    const products = formData.get("products");
    const quantity = formData.get("quantity");
    const measure = formData.get("measure");
    const status = formData.get("status");

    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("price", price);
    requestBody.append("status", status);

    requestBody.append("discountedFrom", discountedFrom);

    requestBody.append("longDescription", longDescription);
    requestBody.append("description", description);
    requestBody.append("quantity", quantity);
    requestBody.append("measure", measure);
    const allProducts = products.split(",").map((elements) => elements.trim());

    allProducts.forEach((products, index) => {
      requestBody.append("products", products);
    });

    requestBody.append("image", primaryImage);

    fetch(`http://${ipAddress}:3000/admindashboard/Packages`, {
      method: "POST",
      body: requestBody,
    })
      .then((response) => {
        if (response.ok) {
          showAlert(
            "Package Added",
            "The Package has been added successfully."
          );
        } else {
          showAlert("Something Went Wrong", "Package wasn't added");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
