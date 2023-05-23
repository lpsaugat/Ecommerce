const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Category = require("../models/Categories");
const Ad = require("../models/Ad");
const Banner = require("../models/Banner");
const siteSettings = require("../models/siteSettings");
const Offer = require("../models/Offer");

const AboutUs = require("../models/AboutUs");

const Order = require("../models/Order");
const Subscription = require("../models/Subscription");
const Filter = require("../models/Filter");

const imageUploader = require("./imageUploader");

const express = require("express");

const controller = {};

//Writing in Carousel
controller.carouselWriting = async (req, res) => {
  const folder = "carousel";
  const file = req.files.backgroundImage;
  let backgroundImage = [];

  try {
    backgroundImage = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  try {
    const newCarousel = await Carousel.create({
      name: req.body.name,
      heading: req.body.heading,
      firstheading: req.body.firstheading,
      offer: req.body.offer,
      backgroundImage: backgroundImage,
    });
    res.status(200).json(newCarousel);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
};

//Carousel Writings Update and Change
controller.carouselUpdate = async (req, res) => {
  const filter = { name: req.body.name };
  const folder = "carousel";
  const file = req.files.backgroundImage;
  let backgroundImage = [];
  let update = {};
  try {
    try {
      backgroundImage = await imageUploader(req, res, file, folder);
      update = { backgroundImage: backgroundImage, ...req.body };
    } catch (err) {
      update = req.body;
    }
  } catch (err) {
    return console.log(err);
  }
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
  const folder = "Subscription";
  const file = req.files.backgroundImage;
  let backgroundImage = [];

  try {
    image = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  try {
    const newSubscription = await Subscription.create({
      name: req.body.name,

      subscriptionText: req.body.subscriptionText,
      backgroundImage: backgroundImage,
    });
    res.json(newSubscription);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Subscription Writings Update and Change
controller.SubscriptionUpdate = async (req, res) => {
  const folder = "Subscription";
  const file = req.files.backgroundImage;
  let backgroundImage = [];

  try {
    image = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  const filter = { name: req.body.name };
  console.log(filter);
  const update = { ...req.body, backgroundImage: backgroundImage };
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
  const folder = "Ad";
  const file = req.files.image;
  let image = [];

  try {
    image = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  try {
    const newAd = await Ad.create({
      name: req.body.name,
      heading: req.body.heading,
      image: image,
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
  const folder = "Ad";
  const file = req.files.image;
  let image = [];
  let update = {};
  try {
    try {
      image = await imageUploader(req, res, file, folder);
      update = { image: image, ...req.body };
    } catch (err) {
      update = req.body;
    }
  } catch (err) {
    return console.log(err);
  }
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
  const folder = "Banner";
  const file = req.files.image;
  let image = [];

  try {
    image = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  try {
    const newBanner = await Banner.create({
      name: req.body.name,
      heading: req.body.heading,
      image: image,
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
  const folder = "Banner";
  const file = req.files.image;
  let image = [];
  let update = {};
  try {
    try {
      image = await imageUploader(req, res, file, folder);
      update = { image: image, ...req.body };
    } catch (err) {
      update = req.body;
    }
  } catch (err) {
    return console.log(err);
  }
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
  const file = req.files.logo;

  let update = {};
  let logos = [];

  try {
    try {
      logos = await imageUploader(req, res, file, folder);
      console.log("logos");

      update = { ...req.body, logo: logos };
    } catch (err) {
      update = req.body;
    }
  } catch (err) {
    return console.log(err);
  }

  try {
    const settings = await siteSettings.findOne({ metaTitle: "Household" });
    if (!settings) {
      return res
        .status(404)
        .json({ message: `No SiteSettings found for "Household"` });
    }
    if (roles.includes(req.user.user_type)) {
      const updatedSiteSettings = await siteSettings.findOneAndUpdate(
        { metaTitle: "Household" },
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

//Show site data
controller.siteSettingsView = async (req, res) => {
  if (req.user.user_type === "admin" || req.user.user_type === "super-admin") {
    const siteSettings = await siteSettings.findOne({ metaTitle: "Household" });

    if (!siteSettings) {
      res.send(`No siteSettings found with for Household`);
    }
    res.send(siteSettings);
  }
};

//Delete Site data
controller.siteSettingsDelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  try {
    const getSiteSettings = await siteSettings.findOne({
      metaTitle: "Household",
    });
    if (!getSiteSettings) {
      return res
        .status(404)
        .json({ message: `No siteSettings found for ${metaTitle}` });
    }
    if (roles.includes(req.user.user_type)) {
      const deletedsiteSettings = await siteSettings.findOneAndDelete({
        metaTitle: "Household",
      });
      console.log(deletedsiteSettings);

      res.status(200).json(deletedsiteSettings);
    } else {
      res.status(403).json(`User is not allowed to delete the siteSettings`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//About Us data
controller.aboutUsData = async (req, res) => {
  const folder = "AboutUs";
  const file = req.files.image;
  const missionFile = req.files.missionImage;
  let image = [];
  let missionImage = [];

  try {
    image = await imageUploader(req, res, file, folder);
  } catch (error) {
    process.exit();
  }
  try {
    missionImage = await imageUploader(req, res, missionFile, folder);
  } catch (error) {
    process.exit();
  }
  try {
    const About = await AboutUs.create({
      title: req.body.title,
      name: req.body.name,
      heading: req.body.heading,
      writing: req.body.writing,
      statistics: req.body.statistics,
      statisticsNumber: req.body.statisticsNumber,
      misson: req.body.misson,
      vison: req.body.vison,
      image: image,
      missionImage: missionImage,
    });
    res.json(About);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//About Us data Update
controller.aboutUsDataUpdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const folder = "AboutUs";

  let update = {};
  let image = [];
  let missionImage = [];

  try {
    try {
      if (req.files.image) {
        const file = req.files.image;
        image = await imageUploader(req, res, file, folder);
      }
      if (req.files.missionImage) {
        const missionFile = req.files.missionImage;

        missionImage = await imageUploader(req, res, missionFile, folder);
      }
      update = { image: image, missionImage: missionImage, ...req.body };
    } catch (err) {
      update = req.body;
    }
  } catch (err) {
    return console.log(err);
  }

  try {
    const About = await AboutUs.findOne({ title: "AboutUs" });
    if (!About) {
      return res
        .status(404)
        .json({ message: `No AboutUs found for Household` });
    }
    if (roles.includes(req.user.user_type)) {
      const updatedAboutUs = await AboutUs.findOneAndUpdate(
        { title: "AboutUs" },
        update,

        { new: true, runValidators: true }
      );
      console.log(About);

      res.status(200).json(About);
    } else {
      res.status(403).json(`User is not allowed to update AboutUs`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Offer details
controller.offer = async (req, res) => {
  console.log(req.body);

  const folder = "offers";
  const file = req.files.image;
  let images = [];

  try {
    images = await imageUploader(req, res, file, folder);
  } catch (error) {
    return;
  }
  try {
    const newOffer = await Offer.create({
      ...req.body,

      image: images,
      createdBy: req.user.id,
    });
    res.json(newOffer);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Offer Details Update and Change
controller.offerUpdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const folder = "offers";
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
    const getOffer = await Offer.findOne({ _id: filter });
    if (!getOffer) {
      return res
        .status(404)
        .json({ message: `No Offer found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getOffer.createdBy.toString() === req.user.id
    ) {
      if (req.user.user_type === "vendor" && req.body.fieldFilter) {
        return res.status(403).json("You are not authorized to do that");
      }
      const updatedOffer = await Offer.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedOffer);

      res.status(200).json(updatedOffer);
    } else {
      res.status(403).json(`User is not allowed to update the Offer`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete a Offer
controller.offerDelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  try {
    const getOffer = await Offer.findOne({ _id: filter });
    if (!getOffer) {
      return res
        .status(404)
        .json({ message: `No Offer found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getOffer.createdBy.toString() === req.user.id
    ) {
      const deletedOffer = await Offer.findOneAndDelete(filter);
      console.log(deletedOffer);

      res.status(200).json(deletedOffer);
    } else {
      res.status(403).json(`User is not allowed to delete the Offer`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Get all Offer
controller.offerView = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const offers = await Offer.find().sort("-createdAt").populate("createdBy");
    res.send(offers);
  }
};

//Make a filter
controller.filter = async (req, res) => {
  console.log(req.body);

  try {
    const newFilter = await Filter.create({
      ...req.body,
    });
    res.json(newFilter);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Update the filter
controller.filterUpdate = async (req, res) => {
  const filter = req.params.id;
  try {
    const getFilter = await Filter.findOne({ _id: filter });
    if (!getFilter) {
      return res
        .status(404)
        .json({ message: `No Filter found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getFilter.createdBy.toString() === req.user.id
    ) {
      if (req.user.user_type === "vendor" && req.body.fieldFilter) {
        return res.status(403).json("You are not authorized to do that");
      }
      const updatedFilter = await Filter.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedFilter);

      res.status(200).json(updatedFilter);
    } else {
      res.status(403).json(`User is not allowed to update the Filter`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = controller;
