const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Category = require("../models/Categories");
const Ad = require("../models/Ad");
const Banner = require("../models/Banner");

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

//Writing in Carousel
controller.carouselwriting = async (req, res) => {
  try {
    const newCarousel = await Carousel.create({
      name: req.body.name,
      heading: req.body.heading,
      offer: req.body.offer,
      backgroundImage: req.file.path,
    });
    res.json(newCarousel);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Carousel Writings Update and Change
controller.carouselupdate = async (req, res) => {
  const filter = { name: req.body.name };
  console.log(filter);
  const update = { ...req.body, backgroundImage: req.file.path };
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
      name: req.body.name,
      heading: req.body.heading,
      backgroundImage: req.file.path,
    });
    res.json(newSubscription);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Subscription Writings Update and Change
controller.SubscriptionUpdate = async (req, res) => {
  const filter = { name: req.body.name };
  console.log(filter);
  const update = { ...req.body, backgroundImage: req.file.path };
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

controller.category = async (req, res) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Writing in Ad
controller.AdWriting = async (req, res) => {
  try {
    const newAd = await Ad.create({
      name: req.body.name,
      heading: req.body.heading,
      backgroundImage: req.file.path,
    });
    res.json(newAd);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Ad Writings Update and Change
controller.AdUpdate = async (req, res) => {
  const filter = { name: req.body.name };
  console.log(filter);
  const update = { ...req.body, backgroundImage: req.file.path };
  try {
    const updatedAd = await Ad.findOneAndUpdate(
      filter,
      update,

      { new: true }
    );
    console.log(updatedAd);

    res.status(200).json(updatedAd);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Writing in Banner
controller.BannerWriting = async (req, res) => {
  try {
    const newBanner = await Banner.create({
      name: req.body.name,
      heading: req.body.heading,
      backgroundImage: req.file.path,
    });
    res.json(newBanner);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Banner Writings Update and Change
controller.BannerUpdate = async (req, res) => {
  const filter = { name: req.body.name };
  console.log(filter);
  const update = { ...req.body, backgroundImage: req.file.path };
  try {
    const updatedBanner = await Banner.findOneAndUpdate(
      filter,
      update,

      { new: true }
    );
    console.log(updatedBanner);

    res.status(200).json(updatedBanner);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

controller.siteSettings = async (req, res) => {};
module.exports = controller;
