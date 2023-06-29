const productReview = document.querySelector("#productReview");

if (productReview) {
  productRevieew.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(productRevieew);
    const comment = formData.get("comment");
    const rating = formData.get("rating");

    fetch(`http://${ipAddress}:3000/productReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Do something with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
