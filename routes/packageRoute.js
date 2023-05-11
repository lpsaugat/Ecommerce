const router = require("express").Router();
const packagesController = require("../controller/packagesController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Packages Add
router.post(
  "/dashboard/packages",
  verifyTokenAndAdmin,

  packagesController.packageDetails
);

//Packages Update
router.put(
  "/dashboard/packages/:id",
  verifyTokenAndAdmin,
  packagesController.packageDetailsUpdate
);

//Packages Update
router.delete(
  "/dashboard/packages/:id",
  verifyTokenAndAdmin,
  packagesController.packageDelete
);

//Get all Packages
router.get(
  "/dashboard/packages/:id",
  verifyTokenAndAdmin,
  packagesController.packageView
);

//PackageType Add
router.post(
  "/dashboard/packageType",
  verifyTokenAndAdmin,

  packagesController.packageTypeDetails
);

//PackageType Update
router.put(
  "/dashboard/packageType/:id",
  verifyTokenAndAdmin,
  packagesController.packageTypeDetailsUpdate
);

//PackageType Update
router.delete(
  "/dashboard/packageType/:id",
  verifyTokenAndAdmin,
  packagesController.packageTypeDelete
);

//Get all PackageType
router.get(
  "/dashboard/packageType/:id",
  verifyTokenAndAdmin,
  packagesController.packageTypeView
);
module.exports = router;
