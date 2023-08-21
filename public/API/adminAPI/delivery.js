const addDelivery = document.querySelector("#addDelivery");

if (addDelivery) {
  addDelivery.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addDelivery);
    const name = formData.get("name");
    const price = formData.get("price");
    const location = formData.get("location");
    const description = formData.get("description");
    const requestBody = new FormData();

    requestBody.append("name", name);
    requestBody.append("price", price);
    requestBody.append("location", location);

    requestBody.append("description", description);

    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });
    fetch(`http://${ipAddress}:3000/admindashboard/delivery`, {
      method: "POST",
      headers: {},
      body: convertedFormData,
    })
      .then((response) => {
        if (response.ok) {
          showAlert(
            "Delivery Added",
            "The Delivery has been added successfully."
          );
        } else {
          showAlert("Something Went Wrong", "Delivery wasn't added", true);
        }
      })
      .catch((error) => {
        showAlert("Error");
        console.error(error);
      });
  });
}
