const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");
// const ip = require("ip");
const ipAddress = window.location.hostname;
console.log(ipAddress);
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const Familysize = formData.get("Familysize");

    const password = formData.get("password");

    const Confirmpassword = formData.get("Confirmpassword");

    if (password === Confirmpassword) {
      fetch(`http://${ipAddress}:3000/Sign_Up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          Familysize,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Do something with the response data
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Password not as same as Confirm Password");
    }
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(signinForm);
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
          return fetch(`http://${ipAddress}:3000/`, {
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
