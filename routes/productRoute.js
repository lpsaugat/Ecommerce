const router = require("express").Router();

const productController = require("../controller/productcontroller");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Products Add
router.post(
  "/dashboard/products",
  verifyTokenAndAuthorization,

  productController.productdetails
);

//Update a product
router.put(
  "/dashboard/products/:id",
  verifyTokenAndAuthorization,

  productController.productupdate
);

//Delete a product
router.delete(
  "/dashboard/products/:id",
  verifyTokenAndAdmin,
  productController.productdelete
);

//Get all products
router.get(
  "/dashboard/products",
  verifyTokenAndAuthorization,
  productController.productview
);

//Get a single product
router.get(
  "/dashboard/products/:id",
  verifyTokenAndAuthorization,
  productController.productviewone
);

//Get a single product
router.post("/dashboard/products/:id", verifyToken, productController.review);

module.exports = router;
