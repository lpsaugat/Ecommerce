const addDelivery = document.querySelector("#addDelivery");
const updateDelivery = document.querySelector("#updateDelivery");

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

if (updateDelivery) {
  updateDelivery.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(updateDelivery);
    const name = formData.get("name");
    const price = formData.get("price");
    const location = formData.get("location");
    const description = formData.get("description");
    const requestBody = new FormData();
    const deliveryID = formData.get("deliveryID");
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
    fetch(`http://${ipAddress}:3000/admindashboard/delivery/${deliveryID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((response) => {
        if (response.ok) {
          showAlert(
            "Delivery Updated",
            "The Delivery has been updated successfully."
          );
        } else {
          showAlert("Something Went Wrong", "Delivery wasn't updated", true);
        }
      })
      .catch((error) => {
        showAlert("Error");
        console.error(error);
      });
  });
}

var deleteDelivery = document.getElementById("deleteDelivery");

function deletefDelivery() {
  deleteDelivery.style.display = "block";
  document.body.style.overflow = "hidden";
}

function cancelfDeleteDelivery() {
  deleteDelivery.style.display = "none";
  document.body.style.overflow = "auto";
}

function adminDeleteDelivery(deliveryID) {
  fetch(`http://${ipAddress}:3000/admindashboard/Delivery/${deliveryID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      {
        showAlert(
          "Delivery Deleted",
          "The delivery has been deleted successfully."
        );
      }
    })
    .then(
      (response) =>
        (window.location.href = `http://${ipAddress}:3000/admindashboard/alldelivery/`)
    )
    .catch((error) => {
      console.error(error);
    });
}
