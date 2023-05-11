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
const Packages = require("../models/Packages");

const { post } = require("jquery");
const app = express();
const imageUploader = require("./imageUploader");

const cloudinary = require("cloudinary").v2;

controller = {};

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
  console.log(req.body);
  try {
    const newPackages = await Packages.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: images,
      products: req.body.productID,
      createdBy: req.user.id,
    });
    res.json(newPackages);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Package Details Update
controller.packageDetailsUpdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const folder = "package";
  let update = {};
  let images = [];
  try {
    if (req.files.image) {
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
    const getPackage = await Packages.findOne({ _id: filter });
    if (!getPackage) {
      return res
        .status(404)
        .json({ message: `No Package found with id ${filter}` });
    }
    if (roles.includes(req.user.user_type)) {
      const updatedPackage = await Packages.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedPackage);

      res.status(200).json(updatedPackage);
    } else {
      res.status(403).json(`User is not allowed to update the Package`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete a Package
controller.packageDelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  const update = { ...req.body };
  try {
    const getPackage = await Packages.findOne({ _id: filter });
    if (!getPackage) {
      return res
        .status(404)
        .json({ message: `No Package found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getPackage.createdBy.toString() === req.user.id
    ) {
      const deletedPackage = await Packages.findOneAndDelete(filter);
      console.log(deletedPackage);

      res.status(200).json(deletedPackage);
    } else {
      res.status(403).json(`User is not allowed to delete the Package`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Get All Packages
controller.packageView = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const Packages = await Packages.find()
      .sort("-createdAt")
      .populate("createdBy");
    res.send(Packages);
  }
  res.send(Packages);
};

//Get a Specific Package
controller.packageViewOne = async (req, res) => {
  if (req.user.user_type === "admin" || req.user.user_type === "super-admin") {
    const product = await Product.findOne({ _id: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    if (!product) {
      res.send(`No product found with id: ${req.params.id}`);
    }
    res.send(product);
  }
  if (!product) {
    res.send(`No product found with id: ${req.params.id}`);
  }
  res.send(product);
};

module.exports = controller;
