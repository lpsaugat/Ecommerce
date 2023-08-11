const updateCarousel = document.querySelector("#updateCarousel");
const updateSubscription = document.querySelector("#updateSubscription");
const updateBanner = document.querySelector("#updateBanner");
const addBanner = document.querySelector("#addBanner");

if (updateCarousel) {
  updateCarousel.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const carouselID = url.split("/").pop();
    console.log(carouselID);
    const formData = new FormData(updateCarousel);

    const offer = formData.get("offer");

    const primaryImage = formData.get("primaryImage");

    const firstheading = tinymce
      .get("descriptionTextArea")
      .getContent({ format: "html" });
    const heading = tinymce
      .get("longDescriptionTextArea")
      .getContent({ format: "html" });
    const categories = formData.get("category");
    const requestBody = new FormData();
    requestBody.append("offer", offer);

    requestBody.append("firstheading", firstheading);
    requestBody.append("heading", heading);

    if (primaryImage.size !== 0) {
      requestBody.append("backgroundImage", primaryImage);
    }

    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/carousel/${carouselID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((data) => {
        {
          showAlert(
            "Carousel Updated",
            "The Carousel has been updated successfully."
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

if (addBanner) {
  addBanner.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const BannerID = url.split("/").pop();
    console.log(BannerID);
    const formData = new FormData(addBanner);

    const name = formData.get("name");

    const primaryImage = formData.get("primaryImage");

    const title = tinymce
      .get("descriptionTextArea")
      .getContent({ format: "html" });
    const text = tinymce
      .get("longDescriptionTextArea")
      .getContent({ format: "html" });
    const categories = formData.get("category");
    const requestBody = new FormData();
    requestBody.append("name", name);

    requestBody.append("title", title);
    requestBody.append("text", text);

    if (primaryImage.size !== 0) {
      requestBody.append("image", primaryImage);
    }

    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/Banner`, {
      method: "POST",
      headers: {},
      body: convertedFormData,
    })
      .then((data) => {
        {
          showAlert(
            "Banner Added",
            "The Banner has been added successfully."
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}


if (updateBanner) {
  updateBanner.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const BannerID = url.split("/").pop();
    console.log(BannerID);
    const formData = new FormData(updateBanner);

    const name = formData.get("name");

    const primaryImage = formData.get("primaryImage");

    const title = tinymce
      .get("descriptionTextArea")
      .getContent({ format: "html" });
    const text = tinymce
      .get("longDescriptionTextArea")
      .getContent({ format: "html" });
    const categories = formData.get("category");
    const requestBody = new FormData();
    requestBody.append("name", name);

    requestBody.append("title", title);
    requestBody.append("text", text);

    if (primaryImage.size !== 0) {
      requestBody.append("image", primaryImage);
    }

    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/Banner/${BannerID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((data) => {
        {
          showAlert(
            "Banner Updated",
            "The Banner has been updated successfully."
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

var deleteBanner = document.getElementById("deleteBanner");

function deletefBanner() {
  deleteBanner.style.display = "block";
  document.body.style.overflow = "hidden";
}

function cancelfDeleteBanner() {
  deleteBanner.style.display = "none";
  document.body.style.overflow = "auto";
}

function adminDeleteBanner(BannerID) {
  fetch(`http://${ipAddress}:3000/admindashboard/Banner/${BannerID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      {
        showAlert(
          "Banner Deleted",
          "The Banner has been deleted successfully."
        );
      }
    })
    .then(
      (response) =>
        (window.location.href = `http://${ipAddress}:3000/admindashboard/banner/`)
    )
    .catch((error) => {
      console.error(error);
    });
}

if (updateSubscription) {
  updateSubscription.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const subscriptionID = url.split("/").pop();
    console.log(subscriptionID);
    const formData = new FormData(updateSubscription);

    const subscriptionText = formData.get("subscriptionText");

    const primaryImage = formData.get("primaryImage");

    
    const requestBody = new FormData();
    requestBody.append("subscriptionText", subscriptionText);


    if (primaryImage.size !== 0) {
      requestBody.append("backgroundImage", primaryImage);
    }

    const formDataArray = Array.from(requestBody.entries());

    var sendRequest = formDataArray.filter(([name, value]) => value !== "");
    const convertedFormData = new FormData();
    sendRequest.forEach(([name, value]) => {
      convertedFormData.append(name, value);
    });

    fetch(`http://${ipAddress}:3000/admindashboard/subscription/${subscriptionID}`, {
      method: "PUT",
      headers: {},
      body: convertedFormData,
    })
      .then((data) => {
        {
          showAlert(
            "Subscription Updated",
            "The Subscription has been updated successfully."
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
