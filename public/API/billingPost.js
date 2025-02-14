const billForm = document.querySelector("#Billform");

if (billForm) {
  billForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(billForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const country = formData.get("country");
    const streetAddress = formData.get("streetAddress");
    const zone = formData.get("zone");

    console.log(name);

    fetch(`http://${ipAddress}:3000/billing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        country,
        streetAddress,
        zone,
        phone,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return fetch(`http://${ipAddress}:3000/payments`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => (window.location.href = response.url))
            .then((data) => {})
            .catch((error) => {
              console.log();
              console.log(error);
            });
        }
      })

      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  });
}
