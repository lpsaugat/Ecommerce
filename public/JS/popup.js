var popper = document.getElementById("popup");

function popupf(element) {
  if (popper.classList.contains("hidden") && screen.width >= 1024) {
    popper.classList.remove("hidden");
    popper.style = "flex";
    document.body.style.overflow = "hidden";
  } else {
    if (element === 0) {
      setTimeout(() => {
        popper.classList.add("hidden");
        popper.style = "hidden";
        document.body.style.overflow = "auto";
      }, 300);
    } else {
      popper.classList.add("hidden");
      popper.style = "hidden";
      document.body.style.overflow = "auto";
    }
  }
}

var productnumber = 0;
function setpopupnumber(element) {
  productnumber = element;
}
