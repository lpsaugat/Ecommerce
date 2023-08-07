const connection = require("express-myconnection");
const User = require("../models/User");
const Cart = require("../models/Cart");

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
const Shipping = require("../models/Shipping");

const { post } = require("jquery");
const app = express();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const controller = {};

controller.signin = async (req, res) => {
  let orderdata;
  let cartdata;
  try {
    orderdata = await Order.find({ user: req.user.id, status: true });
    cartdata = await Cart.find({ user: req.user.id, status: true });
  } catch (err) {
    orderdata = false;
    cartdata = false;
  }
  res.render("Sign_In", { orderdata, cartdata });
};

controller.signup = async (req, res) => {
  let orderdata;
  let cartdata;
  try {
    orderdata = await Order.find({ user: req.user.id, status: true });
    cartdata = await Cart.find({ user: req.user.id, status: true });
  } catch (err) {
    orderdata = false;
    cartdata = false;
  }
  res.render("Sign_Up", { orderdata, cartdata });
};

//SignUp from User
controller.createUser = async (req, res) => {
  try {
    const email = req.body.email;

    const findUser = await User.findOne({ email: email });
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
        phone: req.body.phone,
        addesss: req.body.address,
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
  } catch (err) {
    console.log(err);
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

//Add user from Admin page
controller.addUserPage = async (req, res) => {
  try {
    res.render("admindashboard/userAdd");
  } catch (err) {
    console.log(err);
  }
};

// User Page
controller.userPage = async (req, res) => {
  cartdata = [];
  orderdata = [];
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(5);
    const totalUsers = await User.countDocuments();
    const totalVendors = await User.countDocuments({
      user_type: "vendor",
      status: true,
    });
    const totalCustomers = await User.countDocuments({
      user_type: "customer",
      status: true,
    });
    const unverified = await User.countDocuments({ status: false });

    // const { password, ...others } = user._doc;
    res.render("admindashboard/users", {
      totalUsers,
      totalVendors,
      totalCustomers,
      unverified,
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//Get all Users
controller.getAllUsers = async (req, res) => {
  cartdata = [];
  orderdata = [];
  query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let count;
  let users;
  count = await User.countDocuments(query);
  if (req.query.user_type) {
    user_type = req.query.user_type;
    query.user_type = { $in: [user_type] };
  }
  const totalPages = Math.ceil(count / limit);
  const sort = req.query.sort;
  if (!sort) {
    users = await User.find(query).sort("-createdAt").skip(skip).limit(limit);
  } else if (sort === "oldest") {
    users = await User.find(query).sort("-createdAt").skip(skip).limit(limit);
  } else if (sort === "newest") {
    users = await User.find(query).sort("createdAt").skip(skip).limit(limit);
  }
  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    users,
  };

  res.render("admindashboard/allUsers", {
    users: dataPagination.users,
    dataPagination,
  });
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

//Get customer page
controller.getCustomer = async (req, res) => {
  cartdata = [];
  orderdata = [];
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      const shipping = await Shipping.find({ user: req.params.id });
      res.render("admindashboard/singleUserCustomer", { user, shipping });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get vendor page
controller.getVendor = async (req, res) => {
  cartdata = [];
  orderdata = [];
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      const products = await Product.find({ createdBy: req.params.id });
      const orders = await Order.find({
        vendor: req.params.id,
        orderStatus: "delivered",
      });
      totalAmount = 0;
      totalOrders = 0;
      orders.forEach((order) => {
        totalAmount =
          totalAmount + parseFloat(order.price) * parseFloat(order.quantity);
        totalOrders = totalOrders + parseFloat(order.quantity);
      });
      res.render("admindashboard/singleUserVendor", {
        user,
        products,
        orders,
        totalAmount,
        totalOrders,
      });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};

//Get a specific user
controller.getUser = async (req, res) => {
  cartdata = [];
  orderdata = [];
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      res.render("admindashboard/userEdit", { user });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};

//Edit a specific user
controller.editUser = async (req, res) => {
  update = req.body;
  try {
    const user = await User.find({ id: req.params.id });
    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    } else {
      if (req.user.user_type === "super-admin" || user.id === req.user.id) {
        const updatedUser = await User.findOneAndUpdate(
          { id: req.params.id },
          { update },
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};

//Delete a specific user
controller.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
    console.log(deletedUser);

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

//Add Role
controller.addRole = async (req, res) => {
  try {
    const role = await Role.create({ ...req.body });
    res.json(role);
  } catch (err) {
    res.json(err);
  }
};

//Update Role
controller.updateRole = async (req, res) => {
  const filter = req.params.id;

  try {
    const role = await Role.findOne(filter);
    if (!role) {
      return res.json(`No Role found with id ${filter}`);
    }
    const update = req.body;
    const newRole = await Role.findOneAndUpdate(
      filter,
      update,

      { new: true, runValidators: true }
    );
    return res.json(newRole);
  } catch (err) {}
};

//Delete a Role
controller.deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findOneAndDelete(req.params.id);
    if (!deletedRole) {
      // Return a 404 response if the role is not found
      return res.status(404).json({ message: "Role not found" });
    } else {
      return res.status(200).json({ message: "Role deleted" });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};

// Get All Roles
controller.viewRole = async (req, res) => {
  try {
    const role = await Role.find();
    res.status(200).json(role);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//Add Permission
controller.addPermission = async (req, res) => {
  try {
    const permission = await Permission.create({ ...req.body });
    res.json(permission);
  } catch (err) {
    res.json(err);
  }
};

//Update Permission
controller.updatePermission = async (req, res) => {
  const filter = req.params.id;

  try {
    const permission = await Permission.findOne(filter);
    if (!permission) {
      return res.json(`No Permission found with id ${filter}`);
    }
    const update = req.body;
    const newPermission = await Permission.findOneAndUpdate(
      filter,
      update,

      { new: true, runValidators: true }
    );
    return res.json(newPermission);
  } catch (err) {}
};

//Delete a Permission
controller.deletePermission = async (req, res) => {
  try {
    const deletedPermission = await Permission.findOneAndDelete(req.params.id);
    if (!deletedPermission) {
      // Return a 404 response if the Permission is not found
      return res.status(404).json({ message: "Permission not found" });
    } else {
      return res.status(200).json({ message: "Permission deleted" });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};

// Get All Permissions
controller.viewPermission = async (req, res) => {
  try {
    const permission = await Permission.find();
    res.status(200).json(permission);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = controller;
