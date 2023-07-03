const productReview = document.getElementById("productReview");

if (productReview) {
  productReview.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(productReview);
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    console.log(rating);
    const productID = formData.get("productID");
    fetch(`http://${ipAddress}:3000/reviewProduct/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        rating,
      }),
    })
      .then((data) => {
        // Do something with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
