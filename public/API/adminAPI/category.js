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
        window.location.href = `http://${ipAddress}:3000/admindashboard/category/`;
      })
      .catch((error) => {
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
