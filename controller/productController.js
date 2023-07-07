const connection = require("express-myconnection");
const fs = require("fs");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Review = require("../models/Review");

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
  console.log(update);
  const filter = req.params.id;
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

//Product View
controller.productview = async (req, res) => {
  cartdata = [];
  orderdata = [];

  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const products = await Product.find()
      .limit(5)
      .sort("-createdAt")
      .populate("createdBy");
    res.render("admindashboard/products", { products });
  } else if (req.user.user_type === "vendor") {
    const products = await Product.find({
      createdBy: req.user.id,
    })
      .limit(5)
      .sort("-createdAt");
    res.render("admindashboard/products", { products });
  }
};

//Get a specific product
controller.productviewone = async (req, res) => {
  cartdata = [];
  orderdata = [];

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
      const reviews = Review.find({ productID: req.params.id });
      res.render("admindashboard/singleProduct", { product, reviews });
    } else if (req.user.user_type === "vendor") {
      const product = await Product.findOne({
        createdBy: req.user.id,
        _id: req.params.id,
      });
      if (!product) {
        res.send(`No product found with id: ${req.params.id}`);
      }
      const reviews = Review.find({ productID: req.params.id });

      res.render("admindashboard/singleProduct", { product, reviews });
    }
  } catch (err) {
    console.log(err);
  }
};

//Update Product page
controller.productEdit = async (req, res) => {
  cartdata = [];
  orderdata = [];

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
      res.render("admindashboard/productEdit", { product });
    } else if (req.user.user_type === "vendor") {
      const product = await Product.findOne({
        createdBy: req.user.id,
        _id: req.params.id,
      });
      if (!product) {
        res.send(`No product found with id: ${req.params.id}`);
      }

      res.render("admindashboard/productEdit", { product });
    }
  } catch (err) {
    console.log(err);
  }
};

//Get all Products
controller.getAllProducts = async (req, res) => {
  cartdata = [];
  orderdata = [];
  query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let count;
  let products;
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    products = await Product.find(query)
      .sort("-createdAt")
      .populate("createdBy")
      .skip(skip)
      .limit(limit);
    count = await Product.countDocuments(query);
  } else if (req.user.user_type === "vendor") {
    products = await Product.find({
      createdBy: req.user.id,
      query,
    })
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
    count = await Product.countDocuments({
      createdBy: req.user.id,
      query,
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
  for (const produsct of allProducts) {
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

module.exports = controller;
