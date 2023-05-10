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
module.exports = router;
