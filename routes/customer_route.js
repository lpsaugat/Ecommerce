const router = require("express").Router();
const CryptoJS = require("crypto-js");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/uploadedfiles/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

const customerController = require("../controller/controller");
const {
  verifyTokenOrNon,

  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Homepage
router.get("/", verifyTokenOrNon, customerController.home);
router.post("/search", customerController.search);
router.get("/search", customerController.search);

//About Us
router.get("/AboutUs", verifyTokenOrNon, customerController.aboutus);
router.get("/add_product", customerController.add_product);
router.get("/slider", customerController.slider);
router.get("/subscription", verifyTokenOrNon, customerController.subscription);

//Products page
router.get("/products", verifyTokenOrNon, customerController.filterProduct);
router.get(
  "/singleproduct",
  verifyTokenOrNon,
  customerController.singleproduct
);

//Packages
// router.get("/package", verifyTokenOrNon, customerController.package);
router.get(
  "/singlepackage",
  verifyTokenOrNon,
  customerController.singlepackage
);

//Dynamic Cart amount and Total
router.get("/cartCount", verifyToken, customerController.cartCount);

//Dynamic Popup Route
router.post("/popUp", customerController.popUp);

router.get("/package", verifyTokenOrNon, customerController.familypackages);
router.get("/cart", verifyToken, customerController.cart);
router.get("/Billing", verifyToken, customerController.billing);
router.get("/payments", verifyToken, customerController.payments);
router.get("/success", customerController.success);
router.get("/orderconfirmation", customerController.orderconfirmation);
router.get("/vendor", customerController.vendor);

router.get(
  "/product/:id",
  verifyTokenOrNon,
  customerController.singleproductview
);
router.get("/package/:id", verifyTokenOrNon, customerController.singlepackage);

router.get("/dashboard", verifyToken, customerController.dashboard);
router.get("/mobilepassword", customerController.mobilepassword);

router.get("/test", customerController.test);

router.get("/filterTest", customerController.getAllProducts);
router.post("/products", verifyTokenOrNon, customerController.filterProduct);

//Review for package and product
router.post(
  "/reviewProduct/:id",
  verifyTokenOrNon,
  customerController.reviewProduct
);

router.post(
  "/reviewPackage/:id",
  verifyToken,
  customerController.reviewPackage
);

router.get("/pagesProduct", (req, res) => {
  // Retrieve the existing query parameters
  const { category, subscriptionType, rating, familySize } = req.query;
  const nextPage = req.body.page;
  // Perform pagination logic

  // Construct the next page URL with the existing parameters
  const nextPageURL = `/product?category=${category}&subscriptionType=${subscriptionType}&rating=${rating}&pages=${nextPage}`;

  // Return the next page URL
  res.json({ nextPageURL });
});

module.exports = router;
