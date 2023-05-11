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

module.exports = router;
