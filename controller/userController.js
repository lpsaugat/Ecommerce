const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Order = require("../models/Order");
const Subscription = require("../models/Subscription");

const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const Products = require("../models/Products");
const { post } = require("jquery");
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/uploadedfiles/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const controller = {};

controller.signin = (req, res) => {
  res.render("Sign_In");
};

controller.signup = (req, res) => {
  res.render("Sign_Up");
};

//SignUp from User
controller.createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create New User
    console.log("hi");
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      user_type: req.body.user_type,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ),
    });
    console.log(newUser);
    res.json(newUser);
  } else {
    //User Already Exists
    res.json({
      msg: "User already exists",
      success: false,
    });
  }
};

//SignIn from User
controller.checkUser = async (req, res) => {
  // get the email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  try {
    // query the database for the user with the specified email address
    const user = await User.findOne({ email });

    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);
    if (!user) {
      // if no user is found, return an error response
      return res.status(401).send({ message: "Invalidd email or password" });
    }

    // check if the password matches
    if (req.body.password !== hashedpassword) {
      // if the password doesn't match, return an error response
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // if the email and password are valid, return a success response
    const accessToken = jwt.sign(
      {
        id: user._id,
        user_type: user.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.cookie("Token", { value: accessToken });

    // user = { password, ...others };
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    // if there's an error while querying the database, return an error response
    console.log(error);
    // return res.status(500).send({ error });
  }
};

//Logout
controller.logout = async (req, res, next) => {
  for (const cookieName in req.cookies) {
    res.cookie(cookieName, "", { expires: new Date(0) });
  }
  res.redirect("/");
};

module.exports = controller;
