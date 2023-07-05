const router = require("express").Router();

const productController = require("../controller/productcontroller");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Products Add
router.post(
  "/admindashboard/products",
  verifyTokenAndAuthorization,

  productController.productdetails
);

//Update a product
router.put(
  "/admindashboard/products/:id",
  verifyTokenAndAuthorization,

  productController.productupdate
);

//Delete a product
router.delete(
  "/admindashboard/products/:id",
  verifyTokenAndAdmin,
  productController.productdelete
);

//Get all products
router.get(
  "/admindashboard/products",
  verifyTokenAndAuthorization,
  productController.productview
);

//Get a single product
router.get(
  "/admindashboard/products/:id",
  verifyTokenAndAuthorization,
  productController.productviewone
);

module.exports = router;
