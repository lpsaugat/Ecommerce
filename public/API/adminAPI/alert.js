function showAlert(title, message, isError = false) {
  const alertModal = document.getElementById("customAlert");
  const alertTitle = document.getElementById("alertTitle");
  const alertMessage = document.getElementById("alertMessage");
  const okButton = document.getElementById("okButton");
  const alertContent = document.querySelector(".alert-content");

  if (isError) {
    alertContent.style.backgroundColor = "#DC0D0D";
  } else {
    alertContent.style.backgroundColor = "#38C102";
  }

  alertTitle.textContent = title;
  alertMessage.textContent = message;
  alertModal.style.opacity = "1"; // Set initial opacity to 1
  alertModal.style.display = "block";

  okButton.addEventListener("click", function () {
    hideModal(alertModal);
  });

  setTimeout(function () {
    hideModal(alertModal); // Start the fade-out effect after a certain timeout
  }, 2000);
}

function hideModal(modal) {
  modal.style.opacity = "0"; // Set opacity to 0 to initiate fade-out
  setTimeout(function () {
    modal.style.display = "none";
    modal.style.opacity = "1"; // Reset opacity for next use
  }, 500); // Wait for the fade-out animation to complete before hiding the modal
}
var close = document.getElementsByClassName("closebtn");
var i;

// Loop through all close buttons
for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function () {
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";

    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function () {
      div.style.display = "none";
    }, 2000);
  };
}
