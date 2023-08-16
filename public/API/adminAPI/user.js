const updateUser = document.querySelector("#updateUser");
const adminSignIn = document.querySelector("#adminSignIn");
const addUser = document.querySelector("#addUser");

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
      .then((response) => {
        if (response.ok) {
          showAlert("User Updated", "The user has been updated successfully.");
        } else {
          showAlert("Something Went Wrong", "User wasn't updated");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

if (addUser) {
  addUser.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(addUser);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const email = formData.get("email");
    const password = formData.get("password");

    const image = formData.get("image");
    const user_type = formData.get("user_type");

    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("phone", phone);
    requestBody.append("email", email);

    requestBody.append("address", address);
    requestBody.append("password", password);
    requestBody.append("user_type", user_type);

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

    fetch(`http://${ipAddress}:3000/Sign_Up`, {
      method: "POST",
      body: convertedFormData,
    })
      .then((response) => {
        if (response.ok) {
          showAlert("User Added", "The user has been added successfully.");
        } else {
          showAlert("Something Went Wrong", "User wasn't added");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

var deleteUser = document.getElementById("deleteUser");

function deletefUser() {
  deleteUser.style.display = "block";
  document.body.style.overflow = "hidden";
}

function cancelfDeleteUser() {
  deleteUser.style.display = "none";
  document.body.style.overflow = "auto";
}

function adminDeleteUser(UserID) {
  fetch(`http://${ipAddress}:3000/admindashboard/user/${UserID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        showAlert("User Delted", "The user has been delted successfully.");
      } else {
        showAlert("Something Went Wrong", "User wasn't deleted");
      }
    })
    .then(
      (response) =>
        (window.location.href = `http://${ipAddress}:3000/admindashboard/allusers/`)
    )
    .catch((error) => {
      console.error(error);
    });
}
