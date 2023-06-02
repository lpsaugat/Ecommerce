const search = document.querySelector("#search");

if (search) {
  search.addEventListener("click", (event) => {
    console.log("jkjkj");

    event.preventDefault();

    const formData = new FormData(search);
    const name = formData.get("query");

    fetch(`http://192.168.1.73:3000/`, {
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
