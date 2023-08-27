const addCategory = document.querySelector("#addCategory");
const updateCategory = document.querySelector("#updateCategory");
if (addCategory) {
  addCategory.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addCategory);
    const name = formData.get("name");
    const parentCategory = formData.get("parentCategory");
    const slug = formData.get("slug");
    const image = formData.get("image");
    const description = formData.get("description");
    const requestBody = new FormData();

    requestBody.append("name", name);
    requestBody.append("parentCategory", parentCategory);
    requestBody.append("slug", slug);

    requestBody.append("description", description);
    if (image.size !== 0) {
      requestBody.append("image", image);
    }
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
      .then(async (response) => {
        if (response.ok) {
          showAlert(
            "Category Added",
            "The category has been added successfully."
          );
        } else {
          const errorData = await response.json();
          console.log(errorData);
          showAlert(`${errorData}`, "Category wasn't added", true);
        }
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
    const parentCategory = formData.get("parentCategory");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const categoryID = formData.get("categoryID");
    const image = formData.get("image");
    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("parentCategory", parentCategory);
    requestBody.append("slug", slug);
    requestBody.append("description", description);
    if (image.size !== 0) {
      requestBody.append("image", image);
    }
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
      .then(async (response) => {
        if (response.ok) {
          showAlert(
            "Category Updated",
            "The category has been updated successfully."
          );
        } else {
          const errorData = await response.json();
          console.log(errorData);
          showAlert(`${errorData}`, "Category wasn't added", true);
        }
      })
      .catch((error) => {
        showAlert("Error");
        console.error(error);
      });
  });
}

var deleteCategory = document.getElementById("deleteCategory");

function deletefCategory() {
  deleteCategory.style.display = "block";
  document.body.style.overflow = "hidden";
}

function cancelfDeleteCategory() {
  deleteCategory.style.display = "none";
  document.body.style.overflow = "auto";
}

function adminDeleteCategory(categoryID) {
  fetch(`http://${ipAddress}:3000/admindashboard/category/${categoryID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      {
        showAlert(
          "Category Deleted",
          "The category has been deleted successfully."
        );
      }
    })
    .then(
      (response) =>
        (window.location.href = `http://${ipAddress}:3000/admindashboard/allcategories/`)
    )
    .catch((error) => {
      console.error(error);
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
