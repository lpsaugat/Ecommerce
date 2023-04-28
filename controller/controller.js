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

controller.singleproductview = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;
  const singleproduct = await Product.findOne({ _id: req.params.id });
  res.render(`singleproduct`, { singleproduct, productdata });
};

controller.cart = async (req, res) => {
  const data = await getData();
  var orderdata = {};
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    orderdata = data.orderdata;
  } else if (req.user.user_type === "vendor") {
    orderdata = await Order.find({ vendor: req.user.id });
  } else if (req.user.user_type === "customer") {
    orderdata = await Order.find({ user: req.user.id });
  }
  var subtotal = 0;
  orderdata.forEach((i) => {
    subtotal = subtotal + i.price; // Calculate total price
  });
  res.render("cart", { orderdata, subtotal });
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

controller.test = (req, res) => {
  res.render("test");
};

module.exports = controller;
