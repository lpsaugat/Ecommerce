var ratingbutton = document.querySelectorAll(".ratingbutton");
var rate = document.querySelectorAll(".star");
var unrate = document.querySelectorAll(".star-shade");
var ratingID = document.getElementById("ratingID");
function rating(index, element) {
  const rates = element.parentNode.querySelectorAll(".ratingbutton");

  for (let i = 0; i < rates.length; i++) {
    const r = rates[i];
    r.querySelector(".star").style.display = "none";
    r.querySelector(".star-shade").style.display = "block";
  }

  for (let i = 0; i < rates.length; i++) {
    const r = rates[i];

    r.querySelector(".star-shade").style.display = "none";
    r.querySelector(".star").style.display = "block";

    if (index === i) {
      i = rates.length;
      ratingID.value = index + 1;
      ratingFilter(element);
    }
  }
}

function ratingFetch(index, element) {
  const rates = element.parentNode.querySelectorAll(".ratingbutton");

  for (let i = 0; i < rates.length; i++) {
    const r = rates[i];
    r.querySelector(".star").style.display = "none";
    r.querySelector(".star-shade").style.display = "block";
  }

  for (let i = 0; i < rates.length; i++) {
    const r = rates[i];

    r.querySelector(".star-shade").style.display = "none";
    r.querySelector(".star").style.display = "block";

    if (index === i) {
      i = rates.length;
      ratingFilter(index);
    }
  }
}
