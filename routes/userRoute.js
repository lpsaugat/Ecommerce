const router = require("express").Router();
const User = require("../models/User");

const userController = require("../controller/userController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.get("/Sign_In", userController.signin);
router.post("/Sign_In", userController.checkUser);

router.get("/Sign_Up", userController.signup);
router.post("/Sign_Up", userController.createUser);

//Refactor User functions......................................................

// Update User
router.put("/dashboard/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    );
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Get All Users
router.get("/admindashboard/", verifyTokenAndAdmin, userController.getAllUsers);

// Get All Vendors
router.get(
  "/admindashboard/vendors/",
  verifyTokenAndAdmin,
  userController.getAllVendors
);

//Delete details for a specific user from Username
router.get(
  "/admindashboard/user/:id",
  verifyTokenAndAdmin,
  userController.getUser
);

//Delete a specific user from Username
router.delete(
  "/admindashboard/user/:id",
  verifyTokenAndAdmin,
  userController.deleteUser
);

router.post("/forget-password", userController.forgetPassword);

router.post("/reset-password", userController.resetPassword);

router.post("/verify-email", userController.verifyEmail);

router.get("/verify-email", userController.verifiedEmail);

router.get("/logout", userController.logout);
router.post("/logout", userController.logout);

module.exports = router;
