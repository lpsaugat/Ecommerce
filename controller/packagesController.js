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
const PackageTypes = require("../models/packageType");

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
  const package = {};
  if (req.user.user_type === "admin" || req.user.user_type === "super-admin") {
    package = await Packages.findOne({ _id: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    if (!package) {
      res.send(`No package found with id: ${req.params.id}`);
    }
    res.send(package);
  }
  if (!package) {
    res.send(`No package found with id: ${req.params.id}`);
  }
  res.send(package);
};

//PackageType Details
controller.packageTypeDetails = async (req, res) => {
  const folder = "packageTypes";
  const file = req.files.image;
  let images = [];

  try {
    images = await imageUploader(req, res, file, folder);
  } catch (error) {
    return;
  }
  console.log(req.body);
  try {
    const newPackageTypes = await PackageTypes.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: images,
      products: req.body.productID,
      createdBy: req.user.id,
    });
    res.json(newPackageTypes);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//PackageType Details Update
controller.packageTypeDetailsUpdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const folder = "packageType";
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
    const getPackageType = await PackageTypes.findOne({ _id: filter });
    if (!getPackageType) {
      return res
        .status(404)
        .json({ message: `No PackageType found with id ${filter}` });
    }
    if (roles.includes(req.user.user_type)) {
      const updatedPackageType = await PackageTypes.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedPackageType);

      res.status(200).json(updatedPackageType);
    } else {
      res.status(403).json(`User is not allowed to update the PackageType`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete a PackageType
controller.packageTypeDelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  const update = { ...req.body };
  try {
    const getPackageType = await PackageTypes.findOne({ _id: filter });
    if (!getPackageType) {
      return res
        .status(404)
        .json({ message: `No PackageType found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getPackageType.createdBy.toString() === req.user.id
    ) {
      const deletedPackageType = await PackageTypes.findOneAndDelete(filter);
      console.log(deletedPackageType);

      res.status(200).json(deletedPackageType);
    } else {
      res.status(403).json(`User is not allowed to delete the PackageType`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Get All PackageTypes
controller.packageTypeView = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const PackageTypes = await PackageTypes.find()
      .sort("-createdAt")
      .populate("createdBy");
    res.send(PackageTypes);
  }
  res.send(PackageTypes);
};

//Get a Specific PackageType
controller.packageTypeViewOne = async (req, res) => {
  const packageType = {};
  if (req.user.user_type === "admin" || req.user.user_type === "super-admin") {
    packageType = await PackageTypes.findOne({ _id: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    if (!packageType) {
      res.send(`No packageType found with id: ${req.params.id}`);
    }
    res.send(packageType);
  }
  if (!packageType) {
    res.send(`No packageType found with id: ${req.params.id}`);
  }
  res.send(packageType);
};

module.exports = controller;
