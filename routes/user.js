const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

router.put("/dashboard:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findbyIdAndUpdate(req.params.id, {
        $set: req.body,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.export = router;
