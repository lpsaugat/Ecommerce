var subType = [];
var priceRange = { range1: 0, range2: 200 };
var familySize = [];
var category = [];
var ratingParam = [];

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
    case element.classList.contains("check4"):
      familySize.push("1");
      break;
    case element.classList.contains("check5"):
      familySize.push("2");
      break;
    case element.classList.contains("check6"):
      familySize.push("3");
      break;
    case element.classList.contains("check7"):
      familySize.push("4");
      break;
    case element.classList.contains("check8"):
      familySize.push("5");
      break;
    case element.classList.contains("check9"):
      familySize.push("6");
      break;
    case element.classList.contains("check10"):
      familySize.push("7");
      break;
    case element.classList.contains("check11"):
      familySize.push("8");
      break;
    case element.classList.contains("check12"):
      familySize.push("9");
      break;
    case element.classList.contains("check14"):
      category.push("Non-Veg");
      break;
    case element.classList.contains("check15"):
      category.push("Veg");
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

function filterAddPackage() {
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

  const url = `http://${ipAddress}:3000/package?${searchParams.toString()}`;
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

function pageProduct(pageNumber) {
  const currentURL = window.location.href;

  const url = new URL(currentURL);
  const queryParams = url.searchParams;
  if (queryParams.get("page")) {
    queryParams.delete("page");
  }
  const newUrl = `http://${ipAddress}:3000/products?${queryParams.toString()}&page=${parseInt(
    pageNumber
  )}`;
  console.log(newUrl);
  fetch(newUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => (window.location.href = response.url));
}

function pagePackage(pageNumber) {
  const currentURL = window.location.href;

  const url = new URL(currentURL);
  const queryParams = url.searchParams;

  if (queryParams.get("page")) {
    queryParams.delete("page");
  }

  const newUrl = `http://${ipAddress}:3000/package?${queryParams.toString()}&page=${parseInt(
    pageNumber
  )}`;
  console.log(newUrl);
  fetch(newUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => (window.location.href = response.url));
}
