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
router.get(
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

router.post("/shipping", verifyToken, orderController.shipping);

router.post(
  "/shippingUpdate",
  verifyTokenAndAuthorization,
  orderController.shippingUpdate
);

router.get(
  "/dashboard/cartview",
  verifyTokenAndAuthorization,
  orderController.viewCart
);

router.get(
  "/dashboard/shipping",
  verifyTokenAndAuthorization,
  orderController.viewShipping
);

module.exports = router;
