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
router.get("/admindashboard/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.find();
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get All Vendors
router.get("/admindashboard/vendor/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.find({ user_type: "vendor" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a specific user from Username
router.delete("/admindashboard/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.body.username);
    if (!deletedUser) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "User deleted" });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
});

router.post("/forget-password", userController.forgetPassword);

router.post("/reset-password", userController.resetPassword);

router.post("/verify-email", userController.verifyEmail);

router.get("/verify-email", userController.verifiedEmail);

router.get("/logout", userController.logout);

module.exports = router;
