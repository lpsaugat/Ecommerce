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

const controller = {};

//Product details
controller.productdetails = async (req, res) => {
  const folder = "products";
  const file = req.files.image;
  let images = [];

  images = await imageUploader(file, folder);

  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      priceper: req.body.priceper,
      image: images,
      createdBy: req.user.id,
      category: req.body.category,
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
  const file = req.files.image;
  try {
    if (file) {
      images = await imageUploader(file, folder);
      update = { ...req.body, image: images };
    } else {
      update = req.body;
    }
  } catch (err) {
    res.json("Something went wrong");
  }

  const filter = req.params.id;
  console.log(filter);
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
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    const products = await Product.find()
      .sort("-createdAt")
      .populate("createdBy");
    res.send(products);
  } else if (req.user.user_type === "vendor") {
    const products = await Product.find({
      createdBy: req.user.id,
    });
    res.send(products);
  }
};

//Get a specific product
controller.productviewone = async (req, res) => {
  if (req.user.user_type === "admin" || req.user.user_type === "super-admin") {
    const product = await Product.findOne({ _id: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    if (!product) {
      res.send(`No product found with id: ${req.params.id}`);
    }
    res.send(product);
  } else if (req.user.user_type === "vendor") {
    const product = await Product.findOne({
      createdBy: req.user.id,
      _id: req.params.id,
    });
    if (!product) {
      res.send(`No product found with id: ${req.params.id}`);
    }
    res.send(product);
  }
};

//Customer Order
controller.order = async (req, res) => {
  const { productID, quantity, price } = req.body;
  console.log(req.body.productID);
  const product = await Products.findOne({ _id: productID });
  try {
    var newOrder = await Order.findOneAndUpdate(
      {
        user: req.user.id,
        productID: productID,
      },
      { $inc: { quantity: 1 } },
      { new: true, runValidators: true }
    );
    console.log(newOrder);
    if (newOrder) {
    } else {
      newOrder = await Order.create({
        user: req.user.id,
        productID: product.id,
        price: price,
        vendor: product.createdBy,
        name: product.name,
        priceper: product.priceper,
        image: product.image,
        quantity: quantity,
      });
    }

    if (newOrder) {
      product.quantity = product.quantity - newOrder.quantity;
      await product.save();
    }
    res.json(newOrder);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

controller.orderupdate = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  try {
    const getorder = await Order.findOne({ _id: filter });
    if (!getorder) {
      return res
        .status(404)
        .json({ message: `No Order found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getorder.createdBy.toString() === req.user.id ||
      getorder.User.toString() === req.user.id
    ) {
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        update,

        { new: true, runValidators: true }
      );
      console.log(updatedOrder);

      res.status(200).json(updatedOrder);
    } else {
      res.status(403).json(`User is not allowed to update the Order`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Get all orders from either Vendor or the order from customer.
//Admin to view all products
controller.orderview = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    console.log("sd1f");
    const orders = await Order.find()
      .sort("-createdAt")
      .populate({ path: "User", select: "name user_type email" })
      .populate("ProductID");
    res.json({ count: orders.length, orders });
  } else if (req.user.user_type === "vendor") {
    const orders = await Order.find({
      createdBy: req.user.id,
    });
    res.send(orders);
  } else if (req.user.user_type === "customer") {
    const orders = await Order.find({
      User: req.user.id,
    });
    res.send(orders);
  }
};

//Get all orders for a single product
controller.orderviewproduct = async (req, res) => {
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    console.log("sd1f");
    const orders = await Order.find({ productID: req.params.id })
      .sort("-createdAt")
      .populate("createdBy");
    res.send(orders);
  } else if (req.user.user_type === "vendor") {
    const orders = await Order.find({
      createdBy: req.user.id,
      productID: req.params.id,
    });
    res.send(orders);
  } else if (req.user.user_type === "customer") {
    const orders = await Order.find({
      User: req.user.id,
      productID: req.params.id,
    });
    res.send(orders);
  }
};

//Remove/ Delete and order
controller.orderdelete = async (req, res) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
  const update = { ...req.body };
  try {
    const getorder = await Order.findOne({ _id: filter });
    if (!getorder) {
      return res
        .status(404)
        .json({ message: `No order found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getorder.createdBy.toString() === req.user.id ||
      getorder.User.toString() === req.user.id
    ) {
      const deletedorder = await Order.findOneAndDelete(filter);
      console.log(deletedorder);

      res.status(200).json(deletedorder);
    } else {
      res.status(403).json(`User is not allowed to delete the order`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = controller;
