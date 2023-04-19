const router = require("express").Router();
const User = require("../models/User");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

module.export = router;
