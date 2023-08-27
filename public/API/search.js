const searchForm = document.querySelector("#search");

if (searchForm) {
  searchForm.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);
    const name = formData.get("query");
    console.log(name);

    fetch(`http://${ipAddress}:3000/search?search=${name}`, { method: "GET" })
      .then((response) => (window.location.href = response.url))

      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  });
}
