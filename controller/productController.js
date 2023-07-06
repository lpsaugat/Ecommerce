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
      if (req.user.user_type === "vendor" && req.body.fieldFilter) {
        return res.status(403).json("You are not authorized to do that");
      }
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
    });
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
