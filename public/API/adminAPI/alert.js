function showAlert(title, message) {
  const alertModal = document.getElementById("customAlert");
  const alertTitle = document.getElementById("alertTitle");
  const alertMessage = document.getElementById("alertMessage");
  const okButton = document.getElementById("okButton");

  alertTitle.textContent = title;
  alertMessage.textContent = message;
  alertModal.style.display = "block";

  okButton.addEventListener("click", function () {
    alertModal.style.display = "none";
  });
}
