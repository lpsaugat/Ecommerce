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

//Fetch all of the data from models
async function getData() {
  try {
    const productdata = await Product.find();
    const carouseldata = await Carousel.find();
    const subscriptiondata = await Subscription.find();
    const orderdata = await Order.find();

    return { productdata, carouseldata, subscriptiondata, orderdata };
  } catch (err) {
    console.log(err);
  }
}

controller.home = async (req, res) => {
  try {
    // const productdata = await Product.find({ status: true }).sort("-createdAt");
    const { productdata, carouseldata } = await getData();
    res.render("Homepage", { productdata, carouseldata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.aboutus = (req, res) => {
  res.render("AboutUs");
};

controller.slider = (req, res) => {
  res.render("slider");
};

controller.subscription = async (req, res) => {
  try {
    const data = await getData();
    const subscriptiondata = data.subscriptiondata;
    res.render("subscription", { subscriptiondata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.products = async (req, res) => {
  try {
    const data = await getData();
    const productdata = data.productdata;
    res.render("products", { productdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.add = (req, res) => {
  const data = req.body;
  req.getConnection((err, connection) => {
    const query = connection.query(
      "INSERT INTO products set ?",
      data,
      (err, products) => {
        res.redirect("/Add_product");
        console.log("added");
      }
    );
  });
};

controller.add_product = (req, res) => {
  res.render("Add_product");
};

controller.signin = (req, res) => {
  res.render("Sign_In");
};

controller.signup = (req, res) => {
  res.render("Sign_Up");
};

controller.dashboard = (req, res) => {
  res.render("dashboard");
};

controller.mobilepassword = (req, res) => {
  res.render("mobilepassword");
};

controller.familypackages = (req, res) => {
  res.render("familypackages");
};

controller.package = (req, res) => {
  res.render("Package");
};

controller.singlepackage = (req, res) => {
  res.render("singlepackage");
};

controller.singleproduct = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;
  res.render("singleproduct", { productdata });
};

controller.cart = async (req, res) => {
  const data = await getData();
  const orderdata = data.orderdata;
  res.render("cart", { orderdata });
};

controller.billing = (req, res) => {
  res.render("billing");
};

controller.payments = (req, res) => {
  res.render("payments");
};

controller.success = (req, res) => {
  res.render("success");
};

controller.orderconfirmation = (req, res) => {
  res.render("orderconfirmation");
};

controller.vendor = (req, res) => {
  res.render("vendor");
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

    console.log("user here");
    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);
    console.log(hashedpassword);
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
    console.log(accessToken);
    res.cookie(accessToken);

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

//Writing in Carousel
controller.carouselwriting = async (req, res) => {
  try {
    const newCarousel = await Carousel.create({
      Name: req.body.Name,
      Heading: req.body.Heading,
      Offer: req.body.Offer,
      BackgroundImage: req.file.path,
    });
    res.json(newCarousel);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Carousel Writings Update and Change
controller.carouselupdate = async (req, res) => {
  const filter = { Name: req.body.Name };
  console.log(filter);
  const update = { ...req.body, BackgroundImage: req.file.path };
  try {
    const updatedCarousel = await Carousel.findOneAndUpdate(
      filter,
      update,

      { new: true }
    );
    console.log(updatedCarousel);

    res.status(200).json(updatedCarousel);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Writing in Subscription
controller.SubscriptionWriting = async (req, res) => {
  try {
    const newSubscription = await Subscription.create({
      Name: req.body.Name,
      Heading: req.body.Heading,
      BackgroundImage: req.file.path,
    });
    res.json(newSubscription);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Subscription Writings Update and Change
controller.SubscriptionUpdate = async (req, res) => {
  const filter = { Name: req.body.Name };
  console.log(filter);
  const update = { ...req.body, BackgroundImage: req.file.path };
  try {
    const updatedSubscription = await Subscription.findOneAndUpdate(
      filter,
      update,

      { new: true }
    );
    console.log(updatedSubscription);

    res.status(200).json(updatedSubscription);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Product details
controller.productdetails = async (req, res) => {
  try {
    const newProduct = await Product.create({
      Name: req.body.Name,
      Description: req.body.Description,
      Price: req.body.Price,
      Quantity: req.body.Quantity,
      Priceper: req.body.Priceper,
      Image: req.file.path,
      createdBy: req.user.id,
    });
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Product Details Update and Change
controller.productupdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  try {
    const getproduct = await Product.findOne({ _id: filter });
    if (!getproduct) {
      return res
        .status(404)
        .json({ message: `No product found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getproduct.createdBy.toString() === req.user.id
    ) {
      const updatedProduct = await Product.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedProduct);

      res.status(200).json(updatedProduct);
    } else {
      res.status(403).json(`User is not allowed to update the product`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete a product
controller.productdelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  const update = { ...req.body };
  try {
    const getproduct = await Product.findOne({ _id: filter });
    if (!getproduct) {
      return res
        .status(404)
        .json({ message: `No product found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getproduct.createdBy.toString() === req.user.id
    ) {
      const deletedProduct = await Product.findOneAndDelete(filter);
      console.log(deletedProduct);

      res.status(200).json(deletedProduct);
    } else {
      res.status(403).json(`User is not allowed to delete the product`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Get all Product
controller.productview = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const products = await Product.find()
      .sort("-createdAt")
      .populate("createdBy");
    res.send(products);
  } else if (req.user.user_type === "vendor") {
    const products = await Product.find({
      createdBy: req.user.id,
    });
    res.send(products);
  }
};

//Get a specific product
controller.productviewone = async (req, res) => {
  if (req.user.user_type === "admin" || req.user.user_type === "super-admin") {
    const product = await Product.findOne({ _id: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    if (!product) {
      res.send(`No product found with id: ${req.params.id}`);
    }
    res.send(product);
  } else if (req.user.user_type === "vendor") {
    const product = await Product.findOne({
      createdBy: req.user.id,
      _id: req.params.id,
    });
    if (!product) {
      res.send(`No product found with id: ${req.params.id}`);
    }
    res.send(product);
  }
};

//Customer Order
controller.order = async (req, res) => {
  const { productID, quantity, price } = req.body;
  console.log(req.body.productID);
  const product = await Products.findOne({ _id: productID });
  try {
    const newOrder = await Order.create({
      user: req.user.id,
      productID: product.id,
      price: price,
      vendor: product.createdBy,
      name: product.Name,
      priceper: product.Priceper,
      image: product.Image,
      quantity: quantity,
    });
    if (newOrder) {
      product.Quantity = product.Quantity - newOrder.quantity;
      await product.save();
    }
    res.json(newOrder);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

controller.orderupdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  try {
    const getorder = await Order.findOne({ _id: filter });
    if (!getorder) {
      return res
        .status(404)
        .json({ message: `No Order found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getorder.createdBy.toString() === req.user.id ||
      getorder.User.toString() === req.user.id
    ) {
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedOrder);

      res.status(200).json(updatedOrder);
    } else {
      res.status(403).json(`User is not allowed to update the Order`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Get all orders from either Vendor or the order from customer.
//Admin to view all products
controller.orderview = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    console.log("sd1f");
    const orders = await Order.find()
      .sort("-createdAt")
      .populate({ path: "User", select: "name user_type email" })
      .populate("ProductID");
    res.json({ count: orders.length, orders });
  } else if (req.user.user_type === "vendor") {
    const orders = await Order.find({
      createdBy: req.user.id,
    });
    res.send(orders);
  } else if (req.user.user_type === "customer") {
    const orders = await Order.find({
      User: req.user.id,
    });
    res.send(orders);
  }
};

//Get all orders for a single product
controller.orderviewproduct = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    console.log("sd1f");
    const orders = await Order.find({ productID: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    res.send(orders);
  } else if (req.user.user_type === "vendor") {
    const orders = await Order.find({
      createdBy: req.user.id,
      productID: req.params.id,
    });
    res.send(orders);
  } else if (req.user.user_type === "customer") {
    const orders = await Order.find({
      User: req.user.id,
      productID: req.params.id,
    });
    res.send(orders);
  }
};

//Remove/ Delete an order
controller.orderdelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  const update = { ...req.body };
  try {
    const getorder = await Order.findOne({ _id: filter });
    if (!getorder) {
      return res
        .status(404)
        .json({ message: `No order found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getorder.createdBy.toString() === req.user.id ||
      getorder.User.toString() === req.user.id
    ) {
      const deletedorder = await Order.findOneAndDelete(filter);
      console.log(deletedorder);

      res.status(200).json(deletedorder);
    } else {
      res.status(403).json(`User is not allowed to delete the order`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

controller.test = (req, res) => {
  res.render("test");
};
module.exports = controller;
