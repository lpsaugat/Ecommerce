const router = require("express").Router();
const orderController = require("../controller/orderController");
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

//Create shipping after confirmation
router.post("/shipping", verifyToken, orderController.shipping);

//Update shipping status
router.post(
  "/shippingUpdate",
  verifyTokenAndAuthorization,
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
  "/dashboard/shipping",
  verifyTokenAndAuthorization,
  orderController.viewShipping
);

module.exports = router;
