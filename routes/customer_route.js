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
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.get("/", customerController.home);
router.get("/AboutUs", customerController.aboutus);
router.get("/add_product", customerController.add_product);
router.post("/add", customerController.add);
router.get("/slider", customerController.slider);
router.get("/subscription", customerController.subscription);
router.get("/products", customerController.getAllProducts);

router.get("/package", customerController.package);
router.get("/familypackages", customerController.familypackages);
router.get("/singlepackage", customerController.singlepackage);
router.get("/cart", verifyToken, customerController.cart);
router.get("/Billing", customerController.billing);
router.get("/payments", customerController.payments);
router.get("/success", customerController.success);
router.get("/orderconfirmation", customerController.orderconfirmation);
router.get("/vendor", customerController.vendor);

router.get("/singleproduct", customerController.singleproduct);
router.get("/product/:id", customerController.singleproductview);

router.get("/dashboard", verifyToken, customerController.dashboard);
router.get("/mobilepassword", customerController.mobilepassword);

router.get("/test", customerController.test);

router.get("/productstest", customerController.getAllProducts);

module.exports = router;
