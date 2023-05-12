const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Order = require("../models/Order");
const Subscription = require("../models/Subscription");
const siteSettings = require("../models/siteSettings");
const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const Products = require("../models/Products");
const Package = require("../models/Packages");
const PackageType = require("../models/packageType");
const AboutUs = require("../models/AboutUs");

const { post } = require("jquery");
const app = express();

const controller = {};

//Fetch all of the data from models
async function getData() {
  try {
    const productdata = await Product.find();
    const carouseldata = await Carousel.find();
    const subscriptiondata = await Subscription.find();
    const orderdata = await Order.find();
    const sitedata = await siteSettings.find();
    const packagedata = await Package.find();
    const packageTypedata = await PackageType.find();
    const aboutUsdata = await AboutUs.find();

    return {
      productdata,
      carouseldata,
      subscriptiondata,
      orderdata,
      sitedata,
      packagedata,
      packageTypedata,
      aboutUsdata,
    };
  } catch (err) {
    console.log(err);
  }
}

controller.home = async (req, res) => {
  try {
    // const productdata = await Product.find({ status: true }).sort("-createdAt");
    const {
      productdata,
      carouseldata,
      sitedata,
      packagedata,
      packageTypedata,
      ...otherdata
    } = await getData();
    res.render("Homepage", {
      productdata,
      carouseldata,
      sitedata,
      packagedata,
      packageTypedata,
      packagedata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.aboutus = async (req, res) => {
  const { sitedata, aboutUsdata, ...otherdata } = await getData();
  res.render("AboutUs", { sitedata, aboutUsdata });
};

controller.slider = (req, res) => {
  res.render("slider");
};

controller.subscription = async (req, res) => {
  try {
    const data = await getData();
    const subscriptiondata = data.subscriptiondata;
    const sitedata = data.sitedata;

    res.render("subscription", { sitedata, subscriptiondata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.products = async (req, res) => {
  const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 20;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  try {
    const count = await Product.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const data = await getData();
    const productdata = data?.productdata;

    res.render("products", { productdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.add_product = (req, res) => {
  res.render("Add_product");
};

controller.dashboard = async (req, res) => {
  const data = await getData();
  const userdata = data.userdata;
  const productdata = data.productdata;
  const orderdata = data.orderdata;

  res.render("dashboard", { productdata, userdata, orderdata });
};

controller.mobilepassword = async (req, res) => {
  const data = await getData();
  const userdata = data.userdata;
  const productdata = data.productdata;
  const orderdata = data.orderdata;

  res.render("mobilepassword", { productdata, userdata, orderdata });
};

controller.familypackages = async (req, res) => {
  const data = await getData();
  const packagedata = data.packagedata;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const count = await Package.countDocuments();

  const totalPages = Math.ceil(count / limit);

  const packages = await Package.find()
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    packages,
  };
  console.log(dataPagination);
  res.render("familypackages", { dataPagination, packagedata });
};

controller.package = (req, res) => {
  res.render("Package");
};

controller.singlepackage = async (req, res) => {
  const data = await getData();
  const packagedata = data.packagedata;
  const productdata = data.productdata;
  res.render("singleproduct", { packagedata, productdata });
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
    subtotal = subtotal + i.price * i.quantity; // Calculate total price
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

//Products page and show all products
controller.getAllProducts = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const count = await Product.countDocuments();

  const totalPages = Math.ceil(count / limit);

  const products = await Product.find()
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    products,
  };
  console.log(dataPagination);
  res.render("products", { dataPagination, products });
};

//Products page with filters after query
controller.filterProduct = async (req, res) => {
  let query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let price;
  let subscriptionType;
  let familySize;
  let category;
  // const price = { range1: 0, range2: 200 };
  if (req.body.subscriptionType) {
    subscriptionType = req.body.subscriptionType;
    query.subscriptionType = { $in: subscriptionType };
  }
  if (req.body.price) {
    price = req.body.price;
    query.price = { $gte: price.range1, $lte: price.range2 };
  }
  if (req.body.familySize) {
    familySize = req.body.familySize;
    query.familySize = { $in: familySize };
  }
  if (req.body.category) {
    category = req.body.category;
    query.category = { $in: category };
  }
  if (req.body.rating) {
    rating = req.body.rating;
    query.rating = { $in: rating };
  }
  console.log(query);
  const count = await Product.countDocuments(query);

  // const subscriptionType = req.body.subscriptionType;
  const products = await Product.find(query)
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);
  // res.json({ count: products.length, products });
  // return { count: products.length, products };

  const totalPages = Math.ceil(count / limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    products,
  };
  console.log(dataPagination);
  res.render("products", { dataPagination, products });
};

module.exports = controller;
