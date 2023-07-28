const addCategory = document.querySelector("#addCategory");

if (addCategory) {
  addCategory.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addCategory);
    const name = formData.get("name");
    const parentName = formData.get("parentName");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const requestBody = new FormData();

    requestBody.append("name", name);
    requestBody.append("parentName", parentName);
    requestBody.append("slug", slug);

    requestBody.append("description", description);
    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });
    fetch(`http://${ipAddress}:3000/admindashboard/category`, {
      method: "POST",
      headers: {},
      body: convertedFormData,
    })
      .then((data) => {
        showAlert(
          "Category Added",
          "The Category has been added successfully."
        );
      })
      .catch((error) => {
        showAlert("Error");
        console.error(error);
      });
  });
}

if (updateCategory) {
  updateCategory.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(updateCategory);
    const name = formData.get("name");
    const parentName = formData.get("parentName");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const categoryID = formData.get("categoryID");
    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("parentName", parentName);
    requestBody.append("slug", slug);
    requestBody.append("description", description);
    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });
    fetch(`http://${ipAddress}:3000/admindashboard/category/${categoryID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((data) => {
        showAlert(
          "Category Updated",
          "The Category has been updated successfully."
        );
      })
      .catch((error) => {
        showAlert("Error");
        console.error(error);
      });
  });
}

const dropdownCategory = document.getElementById("categoryDropdown");
const selectedOptionsField = document.getElementById("selectedOptionsField");

dropdownCategory.addEventListener("change", function () {
  const selectedOptions = Array.from(dropdownCategory.selectedOptions).map(
    (option) => option.value
  );
  selectedOptionsField.value = selectedOptions.join(", ");
});
