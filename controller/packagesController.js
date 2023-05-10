const connection = require("express-myconnection");
const fs = require("fs");
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
const imageUploader = require("./imageUploader");

const cloudinary = require("cloudinary").v2;

//Package Details
controller.packageDetails = async (req, res) => {
  const folder = "packages";
  const file = req.files.image;
  let images = [];

  try {
    images = await imageUploader(req, res, file, folder);
  } catch (error) {
    return;
  }
  //   const product = await Product.find({ productID: req.body.productID });
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: images,
      products: req.body.productID,
      createdBy: req.user.id,
      category: req.body.category,
    });
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

module.exports = controller;
