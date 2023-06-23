var subType = [];
var priceRange = { range1: 0, range2: 200 };
var familySize = [];
var category = [];
var ratingParam;

function checkTick(element) {
  switch (true) {
    case element.classList.contains("check1"):
      subType.push("Platinum");
      break;
    case element.classList.contains("check2"):
      subType.push("Gold");
      break;
    case element.classList.contains("check3"):
      subType.push("Silver");
      break;
  }
}

function filterAdd() {
  const searchParams = new URLSearchParams();
  if (subType.length > 0) {
    searchParams.append("subscriptionType", subType.join(","));
  }
  if (priceRange.length > 0) {
    searchParams.append("priceRange", priceRange.join(","));
  }
  if (familySize.length > 0) {
    searchParams.append("familySize", familySize.join(","));
  }
  if (category.length > 0) {
    searchParams.append("category", category.join(","));
  }
  if (ratingParam.length > 0) {
    searchParams.append("rating", ratingParam.join(","));
  }
  console.log(searchParams.toString());

  const url = `http://${ipAddress}:3000/products?${searchParams.toString()}`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => (window.location.href = response.url))
    .then((data) => {})
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

function resetFilters() {
  subType = [];
  priceRange = { range1: 0, range2: 1000 };
  familySize = [];
  category = [];
  ratingParam = [];
  for (let i = 1; i < 22; i++) {
    check[i][0].style.display = "none";
    check[i][1].style.display = "none";
  }
}
