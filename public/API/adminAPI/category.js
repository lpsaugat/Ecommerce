const addCategory = document.querySelector("#addCategory");

if (addcategory) {
  addcategory.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addcategory);
    const name = formData.get("name");
    const parentName = formData.get("parentName");
    const slug = formData.get("slug");
    const description = formData.get("description");

    fetch(`http://${ipAddress}:3000/admindashboard/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { name, parentName, slug, description },
    })
      .then((data) => {
        window.location.href = `http://${ipAddress}:3000/admindashboard/category/`;
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
