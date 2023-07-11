const updateUser = document.querySelector("#updateUser");

if (updateUser) {
  updateUser.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const userID = url.split("/").pop();
    console.log(userID);
    const formData = new FormData(updateUser);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const email = formData.get("email");

    const image = formData.get("image");
    const description = formData.get("description");
    const longDescription = formData.get("longDescription");
    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("phone", phone);
    requestBody.append("email", email);

    requestBody.append("address", address);

    // Append each image to the FormData object

    if (image.size !== 0) {
      requestBody.append("image", image);
    }

    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/users/${userID}`, {
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
