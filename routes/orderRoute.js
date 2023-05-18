const router = require("express").Router();
const orderController = require("../controller/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Customer Order
router.post("/products", verifyToken, orderController.order);

//Customer Order view
router.get("/dashboard/orders", verifyToken, orderController.orderview);

//Order view of a single product
router.get(
  "/dashboard/orders/:id",
  verifyToken,
  orderController.orderviewproduct
);

//Customer Order update
router.get("/dashboard/orders", verifyToken, orderController.orderupdate);

//Customer Order delete
router.delete(
  "/dashboard/orders/:id",
  verifyToken,
  orderController.orderdelete
);
module.exports = router;
