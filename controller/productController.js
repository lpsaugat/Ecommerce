const connection = require("express-myconnection");
const fs = require("fs");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Review = require("../models/Review");
const Category = require("../models/Categories");

const Order = require("../models/Order");
const Subscription = require("../models/Subscription");

const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const path = require("path");
const Products = require("../models/Products");
const app = express();
const imageUploader = require("./imageUploader");

const cloudinary = require("cloudinary").v2;

const controller = {};

//Product details
controller.productdetails = async (req, res) => {
  console.log(req.body);

  const folder = "products";
  const file = req.files.image;
  let images = [];

  try {
    images = await imageUploader(req, res, file, folder);
  } catch (error) {
    return;
  }
  try {
    const newProduct = await Product.create({
      ...req.body,

      image: images,
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
  const folder = "products";
  let update = {};
  let images = [];

  try {
    if (req.files) {
      images = await imageUploader(req, res, req.files.image, folder);
      update = { ...req.body, image: images };
    } else {
      update = req.body;
    }
  } catch (err) {
    return;
  }
  filter = req.params.id;
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
        { _id: filter },
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
      const deletedProduct = await Product.findOneAndDelete({ _id: filter });
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

//Product View
controller.productview = async (req, res) => {
  const category = await Category.find().sort("name");

  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const products = await Product.find()
      .limit(5)
      .sort("-createdAt")
      .populate("createdBy");
    res.render("admindashboard/products", { products, category });
  } else if (req.user.user_type === "vendor") {
    const products = await Product.find({
      createdBy: req.user.id,
    })
      .limit(5)
      .sort("-createdAt");
    res.render("admindashboard/products", { products, category });
  }
};

//Get a specific product
controller.productviewone = async (req, res) => {
  let totalOrders;
  let totalAmount;
  try {
    const category = await Category.find().sort("-createdAt");
    if (
      req.user.user_type === "admin" ||
      req.user.user_type === "super-admin"
    ) {
      const product = await Product.findOne({ _id: req.params.id })
        .sort("-createdAt")
        .populate("createdBy");
      if (!product) {
        res.send(`No product found with id: ${req.params.id}`);
      }
      const reviews = await Review.find({ productID: req.params.id });
      const orders = await Order.find({
        productID: req.params.id,
        orderStatus: "delivered",
      });
      orders.forEach((order) => {
        totalAmount =
          totalAmount + parseFloat(order.price) * parseFloat(order.quantity);
        totalOrders = totalOrders + parseFloat(order.quantity);
      });
      res.render("admindashboard/singleProduct", {
        product,
        reviews,
        totalAmount,
        totalOrders,
        orders,
        category,
      });
    } else if (req.user.user_type === "vendor") {
      const product = await Product.findOne({
        createdBy: req.user.id,
        _id: req.params.id,
      });
      if (!product) {
        res.send(`No product found with id: ${req.params.id}`);
      }
      const reviews = await Review.find({ productID: req.params.id });
      const orders = await Order.find({
        productID: req.params.id,
        orderStatus: "delivered",
      });
      orders.forEach((order) => {
        totalAmount =
          totalAmount + parseFloat(order.price) * parseFloat(order.quantity);
        totalOrders = totalOrders + parseFloat(order.quantity);
      });
      res.render("admindashboard/singleProduct", {
        product,
        reviews,
        totalAmount,
        totalOrders,
        orders,
        category,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Update Product page
controller.productEdit = async (req, res) => {
  const category = await Category.find().sort("name");

  try {
    if (
      req.user.user_type === "admin" ||
      req.user.user_type === "super-admin"
    ) {
      const product = await Product.findOne({ _id: req.params.id })
        .sort("-createdAt")
        .populate("createdBy");
      if (!product) {
        res.send(`No product found with id: ${req.params.id}`);
      }
      res.render("admindashboard/productEdit", { product, category });
    } else if (req.user.user_type === "vendor") {
      const product = await Product.findOne({
        createdBy: req.user.id,
        _id: req.params.id,
      });
      if (!product) {
        res.send(`No product found with id: ${req.params.id}`);
      }

      res.render("admindashboard/productEdit", { product, category });
    }
  } catch (err) {
    console.log(err);
  }
};

//Get all Products
controller.getAllProducts = async (req, res) => {
  query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let count;
  let products;
  let sort;
  if (!req.query.sort) {
    sort = "-createdAt";
  } else {
    sort = req.query.sort;
  }
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    products = await Product.find(query)
      .sort(sort)
      .populate("createdBy")
      .skip(skip)
      .limit(limit);
    count = await Product.countDocuments(query);
  } else if (req.user.user_type === "vendor") {
    products = await Product.find({
      createdBy: req.user.id,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("createdBy");
    count = await Product.countDocuments({
      createdBy: req.user.id,
    });
  }
  const totalPages = Math.ceil(count / limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    products,
  };

  res.render("admindashboard/allProducts", {
    products: dataPagination.products,
    dataPagination,
  });
};

//Update rating on all products
controller.productRating = async (req, res) => {
  const allProducts = await Product.find();
  for (const product of allProducts) {
    var reviews = await Review.find({ productID: product._id });
    const ratedReviews = reviews.filter((review) => review.rating !== null);

    const averageRating =
      ratedReviews.reduce((total, review) => total + review.rating, 0) /
      ratedReviews.length;
    roundedRating = averageRating.toFixed(0);
    const updateProduct = await Product.findOneAndUpdate(
      { _id: product._id },
      { rating: roundedRating },
      { new: true, runValidators: true }
    );
    console.log(updateProduct);
  }
};

//Update Sold quantity and amount on all products
controller.soldQuantity = async (req, res, next) => {
  try {
    let totalAmount = 0;
    let totalOrders = 0;
    products = await Product.find();
    for (const product of products) {
      const orders = await Order.find({
        productID: product.id,
        orderStatus: "delivered",
      });
      orders.forEach((order) => {
        totalAmount =
          totalAmount + parseFloat(order.price) * parseFloat(order.quantity);
        totalOrders = totalOrders + parseFloat(order.quantity);
      });
      const productUpdate = await Product.findByIdAndUpdate(
        { _id: product.id },
        { soldQuantity: totalOrders, soldAmount: totalAmount }
      );
      totalAmount = 0;
      totalOrders = 0;
    }
    console.log("All quantity Updated");
    next();
  } catch (err) {
    console.log(err);
  }
};

//Update all products
controller.changeAllProducts = async (req, res) => {
  const allProducts = await Product.find();
  for (const product of allProducts) {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: product._id },
      { isActive: true },
      { new: true, runValidators: true }
    );
    console.log(updateProduct);
  }
};

module.exports = controller;
