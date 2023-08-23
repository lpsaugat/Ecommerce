const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Category = require("../models/Categories");
const Ad = require("../models/Ad");
const Banner = require("../models/Banner");
const siteSettings = require("../models/siteSettings");
const Offer = require("../models/Offer");
const Sort = require("../models/Sort");

const AboutUs = require("../models/AboutUs");

const Order = require("../models/Order");
const Shipping = require("../models/Shipping");

const Subscription = require("../models/Subscription");
const Filter = require("../models/Filter");

const imageUploader = require("./imageUploader");

const express = require("express");

const controller = {};
cartdata = [];
orderdata = [];

async function total(req, res) {
  try {
    let totalQuantity = 0;
    let totalAmount = 0;
    var ordersCount, totalOrders, totalShipping;
    if (
      req.user.user_type === "super-admin" ||
      req.user.user_type === "admin"
    ) {
      ordersCount = await Order.countDocuments({ orderStatus: "delivered" });
      totalOrders = await Order.find({ orderStatus: "delivered" });
      totalShipping = await Shipping.find({ deliveryStatus: "delivered" });

      totalOrders.forEach((element) => {
        totalQuantity = totalQuantity + parseFloat(element.quantity);
      });
      totalShipping.forEach((element) => {
        totalAmount = totalAmount + parseFloat(element.netTotal);
      });
      console.log(ordersCount, totalQuantity, totalAmount);
    } else if (req.user.user_type === "vendor") {
      ordersCount = await Order.countDocuments({
        orderStatus: "delivered",
        vendor: req.user.id,
      });
      totalOrders = await Order.find({
        orderStatus: "delivered",
        vendor: req.user.id,
      });
      totalOrders.forEach((element) => {
        totalQuantity = totalQuantity + parseFloat(element.quantity);
        totalAmount =
          totalAmount +
          parseFloat(element.price) * parseFloat(element.quantity);
      });
    }
    return { totalQuantity, ordersCount, totalAmount };
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

//Admin LogIn
controller.adminSignIn = async (req, res) => {
  try {
    res.render("admindashboard/signIn");
  } catch (err) {
    console.log(err);
  }
};

//Carousel Page
controller.carouselView = async (req, res) => {
  try {
    const carousel = await Carousel.find().sort("-createdAt");
    res.render("admindashboard/carousel", { carousel, carouseldata: carousel });
  } catch (err) {
    console.log(err);
  }
};

//Carousel Single Page and Update/Edit
controller.carouselSingleView = async (req, res) => {
  try {
    const carousel = await Carousel.findOne({ _id: req.params.id });
    res.render("admindashboard/carouselEdit", { carousel });
  } catch (err) {
    console.log(err);
  }
};

//Writing in Carousel
controller.carouselWriting = async (req, res) => {
  const folder = "carousel";
  const file = req.files.backgroundImage;
  let backgroundImage = [];

  try {
    backgroundImage = await imageUploader(req, res, file, folder);
  } catch (error) {
    return;
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
  const filter = { _id: req.params.id };
  const folder = "carousel";
  let backgroundImage = [];
  let update = {};
  try {
    if (req.files) {
      backgroundImage = await imageUploader(
        req,
        res,
        req.files.backgroundImage,
        folder
      );
      update = { backgroundImage: backgroundImage, ...req.body };
    } else {
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

//subscription Page
controller.subscriptionView = async (req, res) => {
  try {
    const subscription = await Subscription.find().sort("-createdAt");
    res.render("admindashboard/subscription", {
      subscription,
      subscriptiondata: subscription,
    });
  } catch (err) {
    console.log(err);
  }
};

//subscription Single Page with Update/Edit
controller.subscriptionSingleView = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id });
    res.render("admindashboard/subscriptionEdit", { subscription });
  } catch (err) {
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
    return;
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

  let backgroundImage = [];
  let update = {};
  try {
    if (req.files) {
      backgroundImage = await imageUploader(
        req,
        res,
        req.files.backgroundImage,
        folder
      );
      update = { backgroundImage: backgroundImage, ...req.body };
    } else {
      update = req.body;
    }
  } catch (err) {
    return console.log(err);
  }
  const filter = { _id: req.params.id };
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

//Create Category
controller.category = async (req, res) => {
  const folder = "category";
  let create = {};
  let images = [];
  try {
    if (req.files) {
      images = await imageUploader(req, res, req.files.image, folder);
      create = { ...req.body, image: images };
    } else {
      create = req.body;
    }
  } catch (err) {
    console.log(err);
  }
  const findCategory = await Category.findOne({ name: req.body.name });
  if (findCategory) {
    res.status(400).json(`Category ${req.body.name} already exists`);
    return;
  }
  const newCategory = await Category.create(create);
  res.status(200).json("Category added");
};

//Update Category
controller.categoryUpdate = async (req, res) => {
  const folder = "category";
  let create = {};
  let images = [];
  try {
    if (req.files) {
      images = await imageUploader(req, res, req.files.image, folder);
      update = { ...req.body, image: images };
    } else {
      update = req.body;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const newCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      update,
      { new: true, runValidators: true }
    );
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

//Delete a category
controller.categoryDelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  try {
    const getCategory = await Category.findOne({
      id: req.params.id,
    });
    if (!getCategory) {
      return res
        .status(404)
        .json({ message: `No Category found for ${req.params.id}` });
    }
    if (roles.includes(req.user.user_type)) {
      const deletedCategory = await Category.findOneAndDelete({
        id: req.params.id,
      });
      console.log(deletedCategory);

      res.status(200).json(deletedCategory);
    } else {
      res.status(403).json(`User is not allowed to delete the Category`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Update category page
controller.categoryEdit = async (req, res) => {
  const category = await Category.find().sort("-createdAt");

  try {
    const categoryEdit = await Category.findOne({ _id: req.params.id });
    if (!categoryEdit) {
      res.send(`No product found with id: ${req.params.id}`);
    }
    res.render("admindashboard/categoryEdit", { categoryEdit, category });
  } catch (err) {
    console.log(err);
  }
};

// Category page
controller.categoryView = async (req, res) => {
  try {
    const category = await Category.find().sort("-createdAt");
    res.render("admindashboard/category", { category });
  } catch (err) {
    console.log(err);
  }
};

// Get all category
controller.allCategoryView = async (req, res) => {
  query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let count;
  let sort;
  try {
    if (!req.query.sort) {
      sort = "-createdAt";
    } else {
      sort = req.query.sort;
    }

    const category = await Category.find()
      .sort("-createdAt")
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const count = await Category.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const dataPagination = {
      count,
      totalPages,
      page,
      prev: page === 1 ? 1 : page - 1,
      next: page === totalPages ? totalPages : page + 1,
      category,
    };
    res.render("admindashboard/allCategories", {
      category: dataPagination.category,
      dataPagination,
    });
  } catch (err) {
    console.log(err);
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
    return;
  }
  try {
    const newAd = await Ad.create({
      name: req.body.name,
      heading: req.body.heading,
      image: image,
      title: req.body.title,
      text: req.body.text,
    });
    res.json(newAd);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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

//banner Page
controller.bannerView = async (req, res) => {
  try {
    const banner = await Banner.find().sort("-createdAt");
    res.render("admindashboard/banner", { banner, bannerdata: banner });
  } catch (err) {
    console.log(err);
  }
};

//Banner Add Page
controller.bannerAdd = async (req, res) => {
  try {
    res.render("admindashboard/banneradd");
  } catch (err) {
    console.log(err);
  }
};

//banner Single Page with Update/Edit
controller.bannerSingleView = async (req, res) => {
  try {
    const banner = await Banner.findOne({ _id: req.params.id });
    res.render("admindashboard/bannerEdit", { banner });
  } catch (err) {
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
    return;
  }
  try {
    const newBanner = await Banner.create({
      name: req.body.name,
      heading: req.body.heading,
      image: image,
      title: req.body.title,
      text: req.body.text,
    });
    res.json(newBanner);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

//Banner Writings Update and Change
controller.bannerUpdate = async (req, res) => {
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

//Delete a banner
controller.bannerDelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  try {
    const getBanner = await Banner.findOne({
      _id: req.params.id,
    });
    console.log(getBanner);
    if (!getBanner) {
      return res
        .status(404)
        .json({ message: `No Banner found for ${req.params.id}` });
    }
    if (roles.includes(req.user.user_type)) {
      const deletedBanner = await Banner.findOneAndDelete({
        _id: req.params.id,
      });
      console.log(deletedBanner);

      res.status(200).json(deletedBanner);
    } else {
      res.status(403).json(`User is not allowed to delete the Category`);
    }
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
    return;
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
    return;
  }
  try {
    missionImage = await imageUploader(req, res, missionFile, folder);
  } catch (error) {
    return;
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
      if (req.files) {
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

//Delete an Offer
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

    const updatedFilter = await Filter.findOneAndUpdate(
      filter,
      update,

      { new: true, runValidators: true }
    );
    console.log(updatedFilter);

    res.status(200).json(updatedFilter);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Make a Sort
controller.sort = async (req, res) => {
  console.log(req.body);

  try {
    const newSort = await Sort.create({
      ...req.body,
    });
    res.json(newSort);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Update Sort
controller.sortUpdate = async (req, res) => {
  const Sort = req.params.id;
  try {
    const getSort = await Sort.findOne({ _id: Sort });
    if (!getSort) {
      return res.status(404).json({ message: `No Sort found with id ${Sort}` });
    }

    const updatedSort = await Sort.findOneAndUpdate(
      sort,
      update,

      { new: true, runValidators: true }
    );
    console.log(updatedSort);

    res.status(200).json(updatedSort);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete Sort
controller.sortDelete = async (req, res) => {
  const sort = req.params.id;
  try {
    const getSort = await Sort.findOne({ _id: sort });
    if (!getSort) {
      return res.status(404).json({ message: `No Sort found with id ${sort}` });
    }

    const deletedSort = await Sort.findOneAndDelete(sort);
    console.log(deletedSort);

    res.status(200).json(deletedSort);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Admin Homepage
controller.adminHomepage = async (req, res) => {
  let productAmount;
  let users;
  let vendors;
  const { ordersCount, totalQuantity, totalAmount } = await total(req, res);
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    productAmount = await Product.countDocuments();
    users = await User.countDocuments({ user_type: "customer" });
    vendors = await User.countDocuments({ user_type: "vendor" });
  } else if (req.user.user_type === "vendor") {
    productAmount = await Product.countDocuments({ createdBy: req.user.id });
  }

  try {
    res.render("admindashboard/homepage", {
      cartdata,
      orderdata,
      productAmount,
      users,
      vendors,
      ordersCount,
      totalQuantity,
      totalAmount,
    });
  } catch (err) {
    res.status(500).json(err);
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
        { soldQuantity: totalOrders, soldAmount: totalAmount },
        { new: true }
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

//Calculate total Products in a category
controller.categoryNumber = async (req, res, next) => {
  try {
    products = await Product.find();
    categories = await Category.find();
    for (const category of categories) {
      const totalProducts = await Product.find({
        category: category.name,
      }).countDocuments();
      const categoryUpdate = await Category.findByIdAndUpdate(
        { _id: category.id },
        { totalProducts: totalProducts },
        { new: true }
      );
    }
    console.log("All category Updated");
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = controller;
