const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Order = require("../models/Order");
const Subscription = require("../models/Subscription");
const siteSettings = require("../models/siteSettings");
const express = require("express");
const Package = require("../models/Packages");
const PackageType = require("../models/packageType");
const AboutUs = require("../models/AboutUs");
const Offer = require("../models/Offer");
const Filter = require("../models/Filter");
const Review = require("../models/Review");
const Ad = require("../models/Ad");
const Banner = require("../models/Banner");
const Cart = require("../models/Cart");
const Shipping = require("../models/Shipping");

const _ = require("lodash");
const { contains } = require("jquery");

const controller = {};

//Fetch all of the data from models
async function getData(req, res) {
  try {
    const productdata = await Product.find();
    const carouseldata = await Carousel.find();
    const subscriptiondata = await Subscription.find();

    const sitedata = await siteSettings.find();
    const packagedata = await Package.find();
    const packageTypedata = await PackageType.find();
    const aboutUsdata = await AboutUs.find();
    const filterdata = await Filter.find();
    const reviewdata = await Review.find();
    const offerdata = await Offer.find();
    const bannerdata = await Banner.find();
    const addata = await Ad.find();

    let orderdata;
    let cartdata;
    try {
      orderdata = await Order.find({ user: req.user.id, status: true });
      cartdata = await Cart.find({ user: req.user.id, status: true });
    } catch (err) {
      orderdata = false;
      cartdata = false;
    }

    return {
      productdata,
      carouseldata,
      subscriptiondata,
      orderdata,
      cartdata,
      sitedata,
      packagedata,
      packageTypedata,
      aboutUsdata,
      filterdata,
      reviewdata,
      bannerdata,
      addata,
    };
  } catch (err) {
    console.log(err);
  }
}

//Homepage
controller.home = async (req, res) => {
  try {
    const productdata = await Product.find({ status: true }).sort("-createdAt");
    const packagedata = await Package.find({ status: true }).sort("-createdAt");

    var i = 0;
    const {
      carouseldata,
      sitedata,
      packageTypedata,
      addata,
      bannerdata,
      cartdata,
      orderdata,
      ...otherdata
    } = await getData(req, res);

    console.log(req.user);
    res.render("Homepage", {
      productdata,
      carouseldata,
      sitedata,
      packagedata,
      packageTypedata,
      packagedata,
      addata,
      bannerdata,
      cartdata,
      orderdata,

      _,
      i,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.aboutus = async (req, res) => {
  const { sitedata, cartdata, orderdata, aboutUsdata, ...otherdata } =
    await getData();
  res.render("AboutUs", { cartdata, orderdata, sitedata, aboutUsdata });
};

controller.slider = (req, res) => {
  res.render("slider");
};

//Subscription page
controller.subscription = async (req, res) => {
  try {
    const data = await getData(req, res);
    const subscriptiondata = data.subscriptiondata;
    const sitedata = data.sitedata;
    const orderdata = data.orderdata;
    const cartdata = data.cartdata;

    res.render("subscription", {
      cartdata,
      orderdata,
      sitedata,
      subscriptiondata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

//Products page
controller.products = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  const filterdata = data.filterdata;
  const orderdata = data.orderdata;
  const cartdata = data.cartdata;
  const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 20;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  try {
    const count = await Product.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const data = await getData();
    const productdata = data?.productdata;

    res.render("products", {
      cartdata,
      orderdata,
      filterdata,
      sitedata,
      productdata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.add_product = (req, res) => {
  res.render("Add_product");
};

//User dashboard
controller.dashboard = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;
  const sitedata = data.sitedata;
  const orderdata = data.orderdata;
  const cartdata = data.cartdata;
  const userdata = await User.findOne({ _id: req.user.id });
  console.log(userdata);
  res.render("dashboard", {
    sitedata,
    productdata,
    userdata,
    orderdata,
    cartdata,
  });
};

//Page for change password on mobile
controller.mobilepassword = async (req, res) => {
  const data = await getData();
  const userdata = data.userdata;
  const productdata = data.productdata;
  const orderdata = data.orderdata;
  const sitedata = data.sitedata;
  const cartdata = data.cartdata;

  res.render("mobilepassword", {
    sitedata,
    productdata,
    userdata,
    orderdata,
    cartdata,
  });
};

//Subscription Packages page
controller.familypackages = async (req, res) => {
  const data = await getData();
  const packagedata = data.packagedata;
  const sitedata = data.sitedata;
  const filterdata = data.filterdata;
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const count = await Package.countDocuments();

  const totalPages = Math.ceil(count / limit);
  query = {};
  const sort = req.query.sort;
  let packages;
  if (!sort) {
    packages = await Package.find(query)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
  } else if (sort === "high") {
    packages = await Package.find(query).sort("price").skip(skip).limit(limit);
  } else if (sort === "low") {
    packages = await Package.find(query).sort("-price").skip(skip).limit(limit);
  } else if (sort === "newest") {
    packages = await Package.find(query)
      .sort("createdAt")
      .skip(skip)
      .limit(limit);
  }

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    packages,
  };
  console.log(dataPagination);
  res.render("familypackages", {
    filterdata,
    sitedata,
    dataPagination,
    packagedata,
    orderdata,
    cartdata,
  });
};

//Subscription Packages filter
controller.filterPackage = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;
  let query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let price;
  let subscriptionType;
  let familySize;
  let category;
  let rating;
  // const price = { range1: 0, range2: 200 };
  if (req.query.subscriptionType) {
    subscriptionType = req.query.subscriptionType;
    query.subscriptionType = { $in: subscriptionType };
  }
  if (req.query.price) {
    price = req.query.price;
    query.price = { $gte: price.range1, $lte: price.range2 };
  }
  if (req.query.familySize) {
    familySize = req.query.familySize;
    query.familySize = { $in: familySize };
  }
  if (req.query.category) {
    category = req.query.category;
    query.category = { $in: category };
  }
  if (req.query.rating) {
    rating = req.query.rating;
    query.rating = { $in: rating };
  }
  console.log(query);
  const count = await Package.countDocuments(query);

  // const subscriptionType = req.body.subscriptionType;
  const sort = req.query.sort;
  let packages;
  if (!sort) {
    packages = await Package.find(query)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
  } else if (sort === "high") {
    packages = await Package.find(query).sort("price").skip(skip).limit(limit);
  } else if (sort === "low") {
    packages = await Package.find(query).sort("-price").skip(skip).limit(limit);
  } else if (sort === "newest") {
    packages = await Package.find(query)
      .sort("createdAt")
      .skip(skip)
      .limit(limit);
  }

  // res.json({ count: packages.length, packages });
  // return { count: packages.length, packages };

  const totalPages = Math.ceil(count / limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    packages,
  };
  res.render("familypackages", {
    orderdata,
    cartdata,
    sitedata,
    dataPagination,
    packages,
  });
};

controller.package = (req, res) => {
  res.render("Package");
};

//Single Package page
controller.singlepackage = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;
  const singlepackage = await Package.findOne({ _id: req.params.id });
  const products = await Product.find({ _id: { $in: singlepackage.products } });
  const reviews = await Review.find({ packageID: req.params.id });
  const sitedata = data.sitedata;
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total += parseFloat(products[i].price.toString());
  }

  res.render("singlepackage", {
    sitedata,
    singlepackage,
    products,
    productdata,
    reviews,
    cartdata,
    orderdata,
    total,
  });
};

controller.singleproduct = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;
  const sitedata = data.sitedata;
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;

  res.render("singleproduct", { cartdata, orderdata, sitedata, productdata });
};

//Single Product page
controller.singleproductview = async (req, res) => {
  const data = await getData();
  const productdata = data.productdata;
  const sitedata = data.sitedata;
  const singleproduct = await Product.findOne({ _id: req.params.id });
  const reviews = await Review.find({ productID: req.params.id });
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;

  // Filter reviews that have a rating
  const ratedReviews = reviews.filter((review) => review.rating !== null);

  // Calculate the average rating
  const averageRating =
    ratedReviews.reduce((total, review) => total + review.rating, 0) /
    ratedReviews.length;
  averageRatingNumber = averageRating.toFixed(1);
  averageRatingStar = averageRating.toFixed(0);

  console.log(averageRatingStar);

  res.render(`singleproduct`, {
    sitedata,
    singleproduct,
    productdata,
    reviews,
    cartdata,
    orderdata,
    averageRating,
    _,
  });
};

//Customer cart
controller.cart = async (req, res) => {
  const data = await getData(req, res);
  const sitedata = data.sitedata;
  var orderdata = {};
  orderdata = data.orderdata;
  cartdata = data.cartdata;
  var subtotal = 0;
  orderdata.forEach((i) => {
    subtotal = subtotal + i.price * i.quantity; // Calculate total price
  });
  res.render("cart", { sitedata, cartdata, orderdata, subtotal });
};

//Billing and details page after Checkout
controller.billing = async (req, res) => {
  const data = await getData(req, res);
  const sitedata = data.sitedata;
  const orderdata = data.orderdata;
  const cartdata = data.cartdata;

  res.render("billing", { orderdata, cartdata, sitedata });
};

//Payment page
controller.payments = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  const orderdata = data.orderdata;
  const cartdata = data.cartdata;

  res.render("payments", { orderdata, cartdata, sitedata });
};

//
controller.success = (req, res) => {
  res.render("success");
};

//Confirm Order page
controller.orderconfirmation = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  var orderdata = {};
  orderdata = await Order.find({
    user: req.user.id,
    status: true,
    orderStatus: "confirmed",
  });
  cartdata = await Cart.find({ user: req.user.id, status: true });

  // }
  var subtotal = 0;
  orderdata.forEach((i) => {
    subtotal = subtotal + i.price * i.quantity; // Calculate total price
  });
  res.render("orderconfirmation", { sitedata, cartdata, orderdata, subtotal });
};

controller.vendor = (req, res) => {
  res.render("vendor");
};

controller.test = (req, res) => {
  res.render("test");
};

//Products page and show all products
controller.getAllProducts = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  const filterdata = data.filterdata;
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const count = await Product.countDocuments();

  const totalPages = Math.ceil(count / limit);

  const sort = req.query.sort;
  let products;
  if (!sort) {
    products = await Product.find().sort("-createdAt").skip(skip).limit(limit);
  } else if (sort === "high") {
    products = await Product.find().sort("-price").skip(skip).limit(limit);
  } else if (sort === "low") {
    products = await Product.find().sort("price").skip(skip).limit(limit);
  } else if (sort === "newest") {
    products = await Product.find().sort("createdAt").skip(skip).limit(limit);
  }

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    products,
  };
  res.render("products", {
    cartdata,
    orderdata,
    filterdata,
    sitedata,
    dataPagination,
    products,
  });
};

//Products page with filters after query
controller.filterProduct = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  const cartdata = data.cartdata;
  const orderdata = data.orderdata;

  let query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let price;
  let subscriptionType;
  let familySize;
  let category;
  console.log(req.query.subscriptionType);
  // const price = { range1: 0, range2: 200 };
  if (req.query.subscriptionType) {
    subscriptionType = req.query.subscriptionType;
    query.subscriptionType = { $in: [subscriptionType] };
  }
  if (req.query.price) {
    price = req.query.price;
    query.price = { $gte: price.range1, $lte: price.range2 };
  }
  if (req.query.familySize) {
    familySize = req.query.familySize;
    query.familySize = { $in: [familySize] };
  }
  if (req.query.category) {
    category = req.query.category;
    query.category = { $in: [category] };
  }
  if (req.query.rating) {
    rating = req.query.rating;
    query.rating = { $in: [rating] };
  }
  console.log(query);
  const count = await Product.countDocuments(query);

  // const subscriptionType = req.body.subscriptionType;
  const sort = req.query.sort;
  let products;
  if (!sort) {
    products = await Product.find(query)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
  } else if (sort === "high") {
    products = await Product.find(query).sort("price").skip(skip).limit(limit);
  } else if (sort === "low") {
    products = await Product.find(query).sort("-price").skip(skip).limit(limit);
  } else if (sort === "newest") {
    products = await Product.find(query)
      .sort("createdAt")
      .skip(skip)
      .limit(limit);
  }

  // res.json({ count: products.length, products });
  // return { count: products.length, products };

  const totalPages = Math.ceil(count / limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    products,
  };
  res.render("products", {
    cartdata,
    orderdata,
    sitedata,
    dataPagination,
    products,
  });
};

//Search
// controller.search = async (req, res) => {
//   const searchQuery = req.query.search;
//   const regex = new RegExp(searchQuery, "i");
//   let productdata;
//   query = [
//     {
//       description: { $regex: regex },
//     },
//     {
//       name: { $regex: regex },
//     },
//   ];
//   try {
//     productdata = await Product.find({
//       $or: [
//         {
//           description: { $regex: regex },
//         },
//         {
//           name: { $regex: regex },
//         },
//       ],
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

//View Products after search
controller.search = async (req, res) => {
  const data = await getData();
  const sitedata = data.sitedata;
  let query = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  let price;
  let subscriptionType;
  let familySize;
  let category;
  // const price = { range1: 0, range2: 200 };
  if (req.query.search) {
    const searchQuery = req.query.search;
    const regex = new RegExp(searchQuery, "i");
    query.search = { $regex: regex };
  }
  if (req.query.subscriptionType) {
    subscriptionType = req.query.subscriptionType;
    query.subscriptionType = { $in: subscriptionType };
  }
  if (req.query.price) {
    price = req.query.price;
    query.price = { $gte: price.range1, $lte: price.range2 };
  }
  if (req.query.familySize) {
    familySize = req.query.familySize;
    query.familySize = { $in: familySize };
  }
  if (req.query.category) {
    category = req.query.category;
    query.category = { $in: category };
  }
  if (req.query.rating) {
    rating = req.query.rating;
    query.rating = { $in: rating };
  }
  console.log(query);
  const count = await Product.countDocuments(query);

  // const subscriptionType = req.body.subscriptionType;
  const sort = req.query.sort;
  let products;
  if (!sort) {
    products = await Product.find(query)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
  } else if (sort === "high") {
    products = await Product.find(query).sort("price").skip(skip).limit(limit);
  } else if (sort === "low") {
    products = await Product.find(query).sort("-price").skip(skip).limit(limit);
  } else if (sort === "newest") {
    products = await Product.find(query)
      .sort("createdAt")
      .skip(skip)
      .limit(limit);
  }

  // res.json({ count: products.length, products });
  // return { count: products.length, products };

  const totalPages = Math.ceil(count / limit);

  const dataPagination = {
    count,
    totalPages,
    page,
    prev: page === 1 ? 1 : page - 1,
    next: page === totalPages ? totalPages : page + 1,
    products,
  };
  res.render("products", { sitedata, dataPagination, products });
};

//View all offers for customer
controller.offers = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const offers = await Offer.find({
      valid_from: { $gte: new Date(date.now()) },
      valid_to: { $lte: new Date(date.now()) },
      status: true,
    })
      .sort("-createdAt")
      .populate("createdBy");
    res.json(offers);
  }
};

//Post review from user
controller.reviewProduct = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user.id,
      productID: req.params.id,
    });

    res.json(review);
  } catch (err) {
    res.json(err);
  }
};

//Post review from user
controller.reviewPackage = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user.id,
      packageID: req.params.id,
    });
  } catch (err) {
    res.json(err);
  }
};

controller.cartCount = async (req, res) => {
  let cartCount;
  var subTotal = 0;
  var eachTotal = {};
  try {
    orders = await Order.find({ user: req.user.id, status: true });
    orders.forEach((i, index) => {
      subTotal = subTotal + i.price * i.quantity; // Calculate total price
      eachTotal[index] = i.price * i.quantity; // Calculate single element total price
    });
    cartCount = orders.length;
  } catch (err) {
    cartCount = false;
  }
  res.json({ count: cartCount, subTotal, eachTotal });
};

controller.popUp = async (req, res) => {
  let popUp;
  try {
    popUp = await Product.findOne({ _id: req.body.productID });
    res.json({ popUp });
  } catch (err) {
    console.log(err);
  }
};

// controller.eachTotal = async (req, res) => {
//   let cartCount;
//   var eachTotal = {};
//   try {
//     orders = await Order.find({ user: req.user.id, status: true });
//     orderdata.forEach((i) => {
//       eachTotal[i] = i.price * i.quantity; // Calculate total price
//     });
//     cartCount = orders.length;
//   } catch (err) {
//     cartCount = false;
//   }
//   res.json({ count: cartCount, subtotal, eachTotal });
// };

module.exports = controller;
