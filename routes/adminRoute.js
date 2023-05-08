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

const adminController = require("../controller/adminController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Homepage Carousel changes
router.post(
  "/admindashboard/carousel",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  adminController.carouselwriting
);
router.put(
  "/admindashboard/carousel",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  adminController.carouselupdate
);

//Subscription Package Changes
router.post(
  "/admindashboard/subscription",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  adminController.SubscriptionWriting
);

router.put(
  "/admindashboard/subscription",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  adminController.SubscriptionUpdate
);

//Ads
router.post(
  "/admindashboard/Ads",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  adminController.AdWriting
);

router.put(
  "/admindashboard/Ads",
  verifyTokenAndAdmin,
  upload.single("BackgroundImage"),

  adminController.AdUpdate
);

//Create a category
router.post(
  "/admindashboard/category",
  verifyTokenAndAdmin,
  adminController.category
);

//Site settings
router.post(
  "/admindashboard/sitesettings",
  verifyTokenAndAdmin,
  adminController.siteSettings
);

module.exports = router;
