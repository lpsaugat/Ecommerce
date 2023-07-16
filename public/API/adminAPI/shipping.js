const shippingStatus = document.querySelectorAll('form[name="deliveryStatus"]');

shippingStatus.forEach(function (form) {
  var dropdown = form.querySelector('select[name="status"]');
  dropdown.addEventListener("change", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    const status = formData.get("status");
    const updateID = formData.get("shippingID");
    fetch(`http://${ipAddress}:3000/admindashboard/shippingUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        updateID,
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
});
