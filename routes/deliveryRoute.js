const router = require("express").Router();
const deliveryController = require("../controller/deliveryController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Delivery Add
router.post(
  "/admindashboard/delivery",
  verifyTokenAndAdmin,
  productController.deliveryAdd
);

//Delivery Add Page
router.get(
  "/admindashboard/deliveryAdd",
  verifyTokenAndAdmin,
  productController.deliveryAddPage
);

//Delivery Edit
router.patch(
  "/admindashboard/delivery/:id",
  verifyTokenAndAdmin,
  productController.deliveryEdit
);

//Delivery Edit/Single Page
router.get(
  "/admindashboard/deliveryEdit/:id",
  verifyTokenAndAdmin,
  productController.deliveryEditPage
);

//Delivery Delete
router.delete(
  "/admindashboard/delivery/:id",
  verifyTokenAndAdmin,
  productController.deliveryDelete
);
