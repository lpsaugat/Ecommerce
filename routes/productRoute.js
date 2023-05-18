const router = require("express").Router();
const CryptoJS = require("crypto-js");
const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/Images/uploadedfiles/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.originalname +
//         "-" +
//         Date.now() +
//         "." +
//         file.originalname.split(".").pop()
//     );
//   },
// });

// const upload = multer({ storage: storage });

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
  // upload.single("Image"),

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

module.exports = router;
