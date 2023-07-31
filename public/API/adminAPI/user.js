const updateUser = document.querySelector("#updateUser");
const adminSignIn = document.querySelector("#adminSignIn");

if (adminSignIn) {
  adminSignIn.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(adminSignIn);
    const formData = new FormData(adminSignIn);
    const email = formData.get("email");

    const password = formData.get("password");

    fetch(`http://${ipAddress}:3000/Sign_In`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return fetch(`http://${ipAddress}:3000/admindashboard/homepage`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => (window.location.href = response.url))
            .then((data) => {})
            .catch((error) => {
              console.log();
              console.log(error);
            });
        }
      })
      .then((data) => {
        console.log(data);
        // Do something with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

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
