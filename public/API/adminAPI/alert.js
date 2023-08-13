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
var close = document.getElementsByClassName("closebtn");
var i;

// Loop through all close buttons
for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function(){

    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";

    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}