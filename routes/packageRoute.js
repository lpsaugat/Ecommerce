const router = require("express").Router();
const packagesController = require("../controller/packagesController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Packages Add
router.post(
  "/admindashboard/packages",
  verifyTokenAndAdmin,

  packagesController.packageDetails
);

//Packages Update
router.put(
  "/admindashboard/packages/:id",
  verifyTokenAndAdmin,
  packagesController.packageDetailsUpdate
);

//Packages Update
router.delete(
  "/admindashboard/packages/:id",
  verifyTokenAndAdmin,
  packagesController.packageDelete
);

//Get Packages
router.get(
  "/admindashboard/packages",
  verifyTokenAndAdmin,
  packagesController.packageView
);

//Get all Packages
router.get(
  "/admindashboard/allpackages",
  verifyTokenAndAdmin,
  packagesController.getAllPackages
);

//Get single Package
router.get(
  "/admindashboard/packages/:id",
  verifyTokenAndAdmin,
  packagesController.singlePackageView
);

//Edit Pakcage Page
router.get(
  "/admindashboard/packageEdit/:id",
  verifyTokenAndAdmin,
  packagesController.packageEdit
);

//PackageType Add
router.post(
  "/admindashboard/packageType",
  verifyTokenAndAdmin,

  packagesController.packageTypeDetails
);

//PackageType Update
router.put(
  "/admindashboard/packageType/:id",
  verifyTokenAndAdmin,
  packagesController.packageTypeDetailsUpdate
);

//PackageType Update
router.delete(
  "/admindashboard/packageType/:id",
  verifyTokenAndAdmin,
  packagesController.packageTypeDelete
);

//Get all PackageType
router.get(
  "/admindashboard/packageType/:id",
  verifyTokenAndAdmin,
  packagesController.packageTypeView
);
module.exports = router;
