function billingInfo() {
  fetch(`http://${ipAddress}:3000/billing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {})

    .then((data) => {})

    .catch((error) => {
      console.log();
      console.log(error);
    });
}
