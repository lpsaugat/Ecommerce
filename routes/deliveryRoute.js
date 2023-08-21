const router = require("express").Router();
const deliveryController = require("../controller/deliveryController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Delivery View all Page
router.get(
  "/admindashboard/allDelivery",
  verifyTokenAndAdmin,
  deliveryController.deliveryView
);

//Delivery Add
router.post(
  "/admindashboard/delivery",
  verifyTokenAndAdmin,
  deliveryController.deliveryAdd
);

//Delivery Add Page
router.get(
  "/admindashboard/deliveryAdd",
  verifyTokenAndAdmin,
  deliveryController.deliveryAddPage
);

//Delivery Edit
router.patch(
  "/admindashboard/delivery/:id",
  verifyTokenAndAdmin,
  deliveryController.deliveryEdit
);

//Delivery Edit/Single Page
router.get(
  "/admindashboard/deliveryEdit/:id",
  verifyTokenAndAdmin,
  deliveryController.deliveryEditPage
);

//Delivery Delete
router.delete(
  "/admindashboard/delivery/:id",
  verifyTokenAndAdmin,
  deliveryController.deliveryDelete
);

module.exports = router;
