const updateCarousel = document.querySelector("#updateCarousel");

if (updateCarousel) {
  console.log("heheh");
  updateCarousel.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const carouselID = url.split("/").pop();
    console.log(carouselID);
    const formData = new FormData(updateCarousel);
    var heading = formData.get("heading");

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

    console.log(requestBody);
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
