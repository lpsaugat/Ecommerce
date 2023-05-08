const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Category = require("../models/Categories");
const Ad = require("../models/Ad");
const Banner = require("../models/Banner");
const siteSettings = require("../models/siteSettings");

const Order = require("../models/Order");
const Subscription = require("../models/Subscription");

const imageUploader = require("./imageUploader");

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

//Site Settings such as logo, description, social links etc.
controller.siteSettings = async (req, res) => {
  const folder = "settings";
  const file = req.files.logo;
  let logos = [];

  try {
    logos = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  try {
    const settings = await siteSettings.create({
      logo: logos,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      copyrightText: req.body.copyrightText,
      siteDescription: req.body.siteDescription,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      linkedIn: req.body.linkedIn,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
    });
    res.json(settings);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Site settings Update and Change
controller.siteSettingsUpdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const folder = "settings";
  let update = {};
  let logos = [];
  try {
    if (req.files.logo) {
      console.log("logos");

      logos = await imageUploader(res, req.files.logo, folder);
      update = { ...req.body, logo: logos };
    } else {
      update = req.body;
    }
  } catch (err) {
    res.send("Something went wrong");
  }

  const filter = req.params.id;
  console.log(filter);
  try {
    const settings = await siteSettings.findOne({ _id: filter });
    if (!settings) {
      return res
        .status(404)
        .json({ message: `No SiteSettings found with id ${filter}` });
    }
    if (roles.includes(req.user.user_type)) {
      const updatedSiteSettings = await siteSettings.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedSiteSettings);

      res.status(200).json(updatedSiteSettings);
    } else {
      res.status(403).json(`User is not allowed to update the SiteSettings`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = controller;
