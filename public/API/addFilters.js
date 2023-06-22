const subType = ["Premium"];
const priceRange = { range1: 0, range2: 200 };
const familySize = ["Small"];
const category = ["Non-Veg"];
const ratingParam = 4;

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

function filterAdd() {
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
