const search = document.querySelector("#search");
const ip = require("ip");
const ipAddress = ip.address();

if (search) {
  search.addEventListener("click", (event) => {
    console.log("jkjkj");

    event.preventDefault();

    const formData = new FormData(search);
    const name = formData.get("query");

    fetch(`http://${ipAddress}:3000/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
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
