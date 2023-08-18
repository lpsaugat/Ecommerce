const addPackage = document.querySelector("#addPackage");
const updatePackage = document.querySelector("#updatePackage");

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
          showAlert("Something Went Wrong", "Package wasn't added", true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

if (updatepackage) {
  updatepackage.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const packageID = url.split("/").pop();
    console.log(packageID);
    const formData = new FormData(updatepackage);
    const name = formData.get("name");
    const price = formData.get("price");
    const status = formData.get("status");

    var discountedFrom = formData.get("discountedFrom");
    console.log(discountedFrom);
    if (discountedFrom === "") {
      discountedFrom = 0;
    }
    const quantity = formData.get("quantity");
    const measure = formData.get("measure");

    const primaryImage = formData.get("primaryImage");

    const description = tinymce
      .get("descriptionTextArea")
      .getContent({ format: "html" });
    const longDescription = tinymce
      .get("longDescriptionTextArea")
      .getContent({ format: "html" });
    const products = formData.get("product");
    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("quantity", quantity);
    requestBody.append("measure", measure);
    requestBody.append("status", status);

    requestBody.append("price", price);
    requestBody.append("discountedFrom", discountedFrom);

    requestBody.append("longDescription", longDescription);
    requestBody.append("description", description);
    const allProducts = products.split(",").map((elements) => elements.trim());

    allProducts.forEach((product, index) => {
      requestBody.append("products", product);
    });
    // Append each image to the FormData object
    if (primaryImage.size !== 0) {
      requestBody.append("image", primaryImage);
    }

    console.log(requestBody);
    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/packages/${packageID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((response) => {
        if (response.ok) {
          showAlert(
            "Package Updated",
            "The Package has been updated successfully."
          );
        } else {
          showAlert("Something Went Wrong", "Package wasn't updated", true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
