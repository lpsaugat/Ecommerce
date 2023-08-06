function toggleSort(criteria) {
  // Get the current URL
  var currentUrl = window.location.href;
  if (currentUrl.includes("page")) {
    currentUrl = currentUrl.split("?")[0];
  }
  // Check if the URL already contains a sort parameter
  if (currentUrl.includes("?sort=")) {
    // Check if it's ascending order (default case)
    if (currentUrl.includes(`?sort=${criteria}`)) {
      // Replace with descending order URL
      var modifiedUrl = currentUrl.replace(
        `?sort=${criteria}`,
        `?sort=-${criteria}`
      );
    } else if (currentUrl.includes(`?sort=-${criteria}`)) {
      // Replace with ascending order URL
      var modifiedUrl = currentUrl.replace(
        `?sort=-${criteria}`,
        `?sort=${criteria}`
      );
    } else {
      var modifiedUrl =
        window.location.origin + window.location.pathname + `?sort=${criteria}`;
    }
  } else {
    // If no sort parameter exists, add ascending order URL
    var modifiedUrl = currentUrl + `?sort=${criteria}`;
  }

  // Redirect to the modified URL
  window.location.href = modifiedUrl;
}

function adminPages(pageName) {
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const queryParams = url.searchParams;
  const pageNumber = document.getElementById("pageNumber").value;
  if (queryParams.get("page")) {
    queryParams.delete("page");
  }

  const newUrl = `http://${ipAddress}:3000/admindashboard/${pageName}?${queryParams.toString()}&page=${parseInt(
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
