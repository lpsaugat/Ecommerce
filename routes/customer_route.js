const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
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
router.get("/products", customerController.products);

router.get("/Sign_In", customerController.signin);
router.post("/Sign_In", customerController.checkUser);

router.get("/Sign_Up", customerController.signup);
router.post("/Sign_Up", customerController.createUser);

// Update User

router.put("/dashboard/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    );
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Get All Users
router.get("/admindashboard/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.find();
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a specific user from Username
router.delete("/admindashboard/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.body.username);
    if (!deletedUser) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "User deleted" });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
});

router.get("/package", customerController.package);
router.get("/familypackages", customerController.familypackages);
router.get("/singlepackage", customerController.singlepackage);
router.get("/cart", customerController.cart);
router.get("/Billing", customerController.billing);
router.get("/payments", customerController.payments);
router.get("/success", customerController.success);
router.get("/orderconfirmation", customerController.orderconfirmation);
router.get("/vendor", customerController.vendor);

router.get("/singleproduct", customerController.singleproduct);
router.get("/dashboard", customerController.dashboard);
router.get("/mobilepassword", customerController.mobilepassword);

router.get("/test", customerController.test);

//Homepage Carousel changes
router.post(
  "/admindashboard/carousel",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  customerController.carouselwriting
);
router.put(
  "/admindashboard/carousel",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  customerController.carouselupdate
);

//Products
router.post(
  "/admindashboard/products",
  verifyTokenAndAdmin,
  upload.single("Image"),

  customerController.productdetails
);
router.put(
  "/admindashboard/products/:id",
  verifyTokenAndAdmin,
  upload.single("Image"),

  customerController.productupdate
);
router.delete(
  "/admindashboard/products/:id",
  verifyTokenAndAdmin,
  customerController.productdelete
);

module.exports = router;
