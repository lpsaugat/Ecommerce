const searchForm = document.querySelector("#search");

if (searchForm) {
  searchForm.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);
    const name = formData.get("query");
    console.log(name);

    fetch(`http://${ipAddress}:3000/search?search=${name}`, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return fetch(`http://${ipAddress}:3000/search?search=${name}`, {
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
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  });
}
