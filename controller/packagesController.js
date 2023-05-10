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
controller.packageDetails = async (req, res) => {
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
    if (
      roles.includes(req.user.user_type) ||
      getPackage.createdBy.toString() === req.user.id
    ) {
      if (req.user.user_type === "vendor" && req.body.fieldFilter) {
        return res.status(403).json("You are not authorized to do that");
      }
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

module.exports = controller;
