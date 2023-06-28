function changeHeaderCount() {
  fetch("/cartCount")
    .then((response) => response.json())
    .then((data) => {
      // Retrieve the updated count from the response data
      const updatedCount = data.count;

      // Update the cart count element in the DOM
      updateCartCount(updatedCount);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateCartCount(count) {
  var cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = count;
}
