const router = require("express").Router();

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

  adminController.carouselWriting
);
router.put(
  "/admindashboard/carousel",
  verifyTokenAndAdmin,

  adminController.carouselUpdate
);

//Subscription Package Changes
router.post(
  "/admindashboard/subscription",
  verifyTokenAndAdmin,

  adminController.SubscriptionWriting
);

router.put(
  "/admindashboard/subscription",
  verifyTokenAndAdmin,

  adminController.SubscriptionUpdate
);

//Ads
router.post(
  "/admindashboard/ads",
  verifyTokenAndAdmin,

  adminController.AdWriting
);

router.put(
  "/admindashboard/ads",
  verifyTokenAndAdmin,

  adminController.AdUpdate
);

//Banners
router.post(
  "/admindashboard/banners",
  verifyTokenAndAdmin,

  adminController.BannerWriting
);

router.put(
  "/admindashboard/banner",
  verifyTokenAndAdmin,

  adminController.BannerUpdate
);

//Add offers
router.post(
  "/admindashboard/offer",
  verifyTokenAndAdmin,
  adminController.offer
);

//Offer update
router.patch(
  "/admindashboard/offer",
  verifyTokenAndAdmin,
  adminController.offerUpdate
);

//Offer delete
router.delete(
  "/admindashboard/offer",
  verifyTokenAndAdmin,
  adminController.offerDelete
);

//Create a category
router.post(
  "/admindashboard/category",
  verifyTokenAndAdmin,
  adminController.category
);

//Delete a category
router.delete(
  "/admindashboard/category/:id",
  verifyTokenAndAdmin,
  adminController.categoryDelete
);

//Get categories
router.get(
  "/admindashboard/category",
  verifyTokenAndAdmin,
  adminController.categoryView
);

//Get all categories
router.get(
  "/admindashboard/allcategories",
  verifyTokenAndAdmin,
  adminController.allCategoryView
);

//Site settings
router.post(
  "/admindashboard/sitesettings",
  verifyTokenAndAdmin,
  adminController.siteSettings
);

//Site setting update
router.put(
  "/admindashboard/sitesettings",
  verifyTokenAndAdmin,
  adminController.siteSettingsUpdate
);

//get all site data
router.get(
  "/admindashboard/sitesettings",
  verifyTokenAndAdmin,
  adminController.siteSettingsView
);

//About Us settings and data
router.post(
  "/admindashboard/aboutus",
  verifyTokenAndAdmin,
  adminController.aboutUsData
);

//About Us data updates
router.put(
  "/admindashboard/aboutus",
  verifyTokenAndAdmin,
  adminController.aboutUsDataUpdate
);

//Add filters
router.post(
  "/admindashboard/filter",
  verifyTokenAndAdmin,
  adminController.filter
);

//filter update
router.patch(
  "/admindashboard/filter",
  verifyTokenAndAdmin,
  adminController.filterUpdate
);

//Add sorts
router.post("/admindashboard/sort", verifyTokenAndAdmin, adminController.sort);

//sort update
router.patch(
  "/admindashboard/sort",
  verifyTokenAndAdmin,
  adminController.sortUpdate
);

//sort delete
router.delete(
  "/admindashboard/sort/:id",
  verifyTokenAndAdmin,
  adminController.sortDelete
);

//View Homepage
router.get(
  "/admindashboard/homepage",
  verifyTokenAndAdmin,
  adminController.adminHomepage
);
module.exports = router;
