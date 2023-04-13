const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (event) => {
  console.log("jkjkj");

  event.preventDefault();

  const formData = new FormData(signupForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const Familysize = formData.get("Familysize");

  const password = formData.get("password");
  const Confirmpassword = formData.get("Confirmpassword");

  if (password === Confirmpassword) {
    fetch("http://192.168.1.88:3000/Sign_Up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        Familysize,
        Confirmpassword,
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
  }
  else {
      alert("Password not as same as Confirm Password")
  }
});
