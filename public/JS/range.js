var rangeMin = 0;
var range = document.querySelectorAll(".range-selected");
var rangeInput = document.querySelectorAll(".range-input input");
var rangePrice = document.querySelectorAll(".range-price input");

// rangeInput.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     let minRange = parseInt(rangeInput[0].value);
//     let maxRange = parseInt(rangeInput[1].value);

//     if (maxRange - minRange < rangeMin) {
//       if (e.target.className === "min") {
//         rangeInput[0].value = maxRange - rangeMin;
//       } else {
//         rangeInput[1].value = minRange + rangeMin;
//       }
//     } else {
//       rangePrice[0].value = minRange;
//       rangePrice[1].value = maxRange;
//       range[0].style.left = (minRange / rangeInput[0].max) * 100 + "%";
//       range[0].style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
//     }
//   });
// });

// rangePrice.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     let minPrice = rangePrice[0].value;
//     let maxPrice = rangePrice[1].value;
//     if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
//       if (e.target.className === "min") {
//         rangeInput[0].value = minPrice;
//         range[0].style.left = (minPrice / rangeInput[0].max) * 100 + "%";
//       } else {
//         rangeInput[1].value = maxPrice;
//         range[0].style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
//       }
//     }
//   });
// });

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(rangeInput[2].value);
    let maxRange = parseInt(rangeInput[3].value);

    if (maxRange - minRange < rangeMin) {
      if (e.target.className === "min") {
        rangeInput[2].value = maxRange - rangeMin;
      } else {
        rangeInput[3].value = minRange + rangeMin;
      }
    } else {
      rangePrice[2].value = minRange;
      rangePrice[3].value = maxRange;
      range[1].style.left = (minRange / rangeInput[2].max) * 100 + "%";
      range[1].style.right = 100 - (maxRange / rangeInput[3].max) * 100 + "%";
    }
    priceFilter(rangeInput[2].value, rangeInput[3].value);
  });
});

rangePrice.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = rangePrice[2].value;
    let maxPrice = rangePrice[3].value;
    if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "min") {
        rangeInput[2].value = minPrice;
        range[1].style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[3].value = maxPrice;
        range[1].style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});
