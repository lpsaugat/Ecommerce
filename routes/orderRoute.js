const router = require("express").Router();
const orderController = require("../controller/orderController");
const customerController = require("../controller/controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Customer Order
router.post("/order", verifyToken, orderController.order, orderController.cart);

//Customer Order view
router.get("/dashboard/orders", verifyToken, orderController.orderview);

//Order view of a single product
router.get(
  "/dashboard/orders/:id",
  verifyToken,
  orderController.orderviewproduct
);

//Customer Order update
router.patch(
  "/dashboard/orders",
  verifyToken,
  orderController.orderupdate,
  orderController.cart
);

//Customer Order delete
router.delete(
  "/dashboard/orders/:id",
  verifyToken,
  orderController.orderdelete,
  orderController.cart
);

//Create billing after confirmation
router.post("/billing", verifyToken, orderController.billing);

//Create shipping after confirmation
router.post("/shipping", verifyToken, orderController.shipping);

//Update shipping status
router.post(
  "/admindashboard/shippingUpdate",
  verifyTokenAndAdmin,
  orderController.shippingUpdate
);

//View all Carts
router.get(
  "/dashboard/cartview",
  verifyTokenAndAuthorization,
  orderController.viewCart
);

//View Shipping
router.get(
  "/admindashboard/shipping",
  verifyTokenAndAdmin,
  orderController.viewShipping
);

//View All Shipping
router.get(
  "/admindashboard/allshipping",
  verifyTokenAndAdmin,
  orderController.viewAllShipping
);

//View Single Shipping
router.get(
  "/admindashboard/shipping/:id",
  verifyTokenAndAdmin,
  orderController.viewSingleShipping
);

module.exports = router;
