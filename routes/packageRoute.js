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

module.exports = router;
