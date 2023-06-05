const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Order = require("../models/Order");
const Subscription = require("../models/Subscription");
const CryptoJS = require("crypto-js");
const express = require("express");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

const Products = require("../models/Products");
const { post } = require("jquery");
const app = express();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const user_type = req.body.user_type;
    if (["admin", "super-admin"].includes(user_type)) {
      return res.status(403).json({
        msg: "Unauthorized",
        success: false,
      });
    }
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
    res.status(201).json(newUser);
  } else {
    //User Already Exists
    res.status(400).json({
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
  if (!user) {
    // if no user is found, return an error response
    return res.status(404).send({ message: "Invalid email or password" });
  }
  if (user.status === false) {
    return res
      .status(403)
      .send({ message: "Unauthorized, please contact admin" });
  }
  try {
    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    // check if the password matches
    if (req.body.password !== hashedpassword) {
      // if the password doesn't match, return an error response
      return res.status(400).send({ message: "Invalid email or password" });
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

//Forget Password

controller.forgetPassword = async (req, res) => {
  try {
    email = req.body.email;

    const user = User.findOne({ email: email });
    if (user) {
      const token = randomstring.generate();
      console.log(token);
      await User.updateOne({ email: email }, { $set: { token: token } });
      const msg = {
        to: "lpsaugat@gmail.com",
        from: "infoprabidhilabs@gmail.com",
        subject: "Household, password change",
        html: `<p> Hello,
          ${user.name}
          ,Please copy the link and reset your password <a href="http://192.168.1.88:3000/reset-password?token=
          ${token}"> and reset your password</a>`,
      };
      sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error(error));
      res
        .status(200)
        .send({ success: true, message: "Please check your email" });
    } else {
      res
        .status(400)
        .send({ success: true, message: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

//Reset password after forgot password
controller.resetPassword = async (req, res) => {
  const token = req.query.token;

  const user = await User.findOne({ email: req.body.email });
  console.log(user.token);
  if (user.token === token) {
    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SECRET
        ).toString(),
      },
      { new: true, runValidators: true }
    );
    res.status(200).json("Your password has been changed");
  }
};

controller.verifyEmail = async (req, res) => {
  try {
    email = req.body.email;

    const user = User.findOne({ email: email });
    if (user) {
      const token = randomstring.generate();
      console.log(token);
      await User.updateOne({ email: email }, { $set: { Verifytoken: token } });
      const msg = {
        to: "saugat0paudel0@gmail.com",
        from: "infoprabidhilabs@gmail.com",
        subject: "Verify email for your account",
        html: `<p> Hello,
          ${user.name}
          ,Please copy the link and verify your email <a href="http://192.168.1.88:3000/verify-email?token=
          ${token}&email=${email}"> Verify your account </a>`,
      };
      sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error(error));
      res
        .status(200)
        .send({ success: true, message: "Please check your email" });
    } else {
      res
        .status(400)
        .send({ success: true, message: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

controller.verifiedEmail = async (req, res) => {
  const token = req.query.token;
  const email = req.query.email;
  const user = await User.findOne({ email: email });
  console.log(user.Verifytoken);
  if (user.Verifytoken === token) {
    await User.findOneAndUpdate(
      { email: email },
      {
        status: true,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json("You are verified, you can now use your account");
  }
};

//Logout
controller.logout = async (req, res, next) => {
  for (const cookieName in req.cookies) {
    res.cookie(cookieName, "", { expires: new Date(0) });
  }
  res.redirect("/");
};

//User changes from Admin

// Get All Users
controller.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Get All Vendors
controller.getAllVendors = async (req, res) => {
  try {
    const user = await User.find({ user_type: "vendor" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//Get a specific user from Username
controller.getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.params.username);
    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};

//Delete a specific user from Username
controller.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.username);
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
};

//Create billing from User
controller.createBilling = async (req, res) => {
  const newBilling = await Billing.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    user: req.user.id,
    address: req.body.address,
    status: true,
  });
  console.log(newBilling);
  res.status(201).json(newBilling);
};

module.exports = controller;
