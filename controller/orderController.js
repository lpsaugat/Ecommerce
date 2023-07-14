const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Shipping = require("../models/Shipping");
const Billing = require("../models/Billing");

const Subscription = require("../models/Subscription");

const express = require("express");

const Products = require("../models/Products");

const imageUploader = require("./imageUploader");

const cloudinary = require("cloudinary").v2;

const controller = {};
//Customer Order

controller.order = async (req, res, next) => {
  const { productID, quantity, price } = req.body;
  const product = await Products.findOne({ _id: productID });
  try {
    var newOrder = await Order.findOneAndUpdate(
      {
        user: req.user.id,
        productID: productID,
      },
      { $inc: { quantity: quantity } },
      { new: true, runValidators: true }
    );

    if (newOrder) {
    } else {
      newOrder = await Order.create({
        user: req.user.id,
        productID: product.id,
        price: product.price,
        vendor: product.createdBy,
        name: product.name,
        quantity: quantity,
      });
    }

    if (newOrder) {
      product.quantity = product.quantity - newOrder.quantity;
      await product.save();
    }
    next();
    res.json(newOrder);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

controller.orderupdate = async (req, res, next) => {
  const roles = ["super-admin", "admin"];
  const filter = req.body.id;
  const update = req.body.quantity;
  try {
    const getorder = await Order.findOne({ _id: filter });
    console.log();
    const productQuantity = await Products.findOneAndUpdate(
      { _id: getorder.id },
      { $inc: { quantity: -req.body.quantity } },
      { new: true, runValidators: true }
    );
    if (!getorder) {
      return res
        .status(404)
        .json({ message: `No Order found with id ${filter}` });
    }
    if (
      roles.includes(req.user.user_type) ||
      getorder.createdBy.toString() === req.user.id ||
      getorder.user.toString() === req.user.id
    ) {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: filter },
        { $inc: { quantity: req.body.quantity } },
        { new: true, runValidators: true }
      );
      next();
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
    const orders = await Order.find()
      .sort("-createdAt")
      .populate({ path: "user", select: "name user_type email" })
      .populate("productID");
    res.json({ count: orders.length, orders });
  } else if (req.user.user_type === "vendor") {
    const orders = await Order.find({
      createdBy: req.user.id,
    });
    res.send(orders);
  } else if (req.user.user_type === "customer") {
    const orders = await Order.find({
      user: req.user.id,
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
      user: req.user.id,
      productID: req.params.id,
    });
    res.send(orders);
  }
};

//Remove/ Delete and order
controller.orderdelete = async (req, res, next) => {
  const roles = ["super-admin", "admin"];
  const filter = req.params.id;
  console.log(filter);
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
      getorder.user.toString() === req.user.id
    ) {
      const deleteProduct = await Order.findOneAndDelete(filter);
      res.json(deleteProduct);
    } else {
      res.status(403).json(`User is not allowed to delete the order`);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Cart
controller.cart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, status: true });

    var order = await Order.find({ user: req.user.id });

    let totalPrice = 0;

    order.forEach((order) => {
      totalPrice =
        totalPrice + parseFloat(order.price) * parseFloat(order.quantity);
    });
    //Find if a cart already exists and use that to update, If there isn't one; Create.
    if (!cart) {
      const newCart = await Cart.create({
        user: req.user.id,
        orders: order,
      });
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        { orders: order, total: totalPrice },
        { new: true }
      );
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

//Create Billing of Customer after he posts onto Billing info
controller.billing = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, status: true });

    if (!cart) {
      return res.json("There isn't any product in your cart");
    } else {
      const newBilling = await Billing.create({
        user: req.user.id,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        streetAddress: req.body.streetAddress,
      });
      console.log(newBilling);
    }
  } catch (err) {
    console.log(err.message);
  }
};

//Create Shipping of Cart when delivery is ready
controller.shipping = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, status: true });
    const order = await Order.updateMany(
      { user: req.user.id },
      { $set: { order: "confirmed" } }
    );

    //Find the cart and add the cart onto the shipping. If there isn't one; send error.
    if (!cart) {
      return res.json("There isn't any product in your cart");
    } else {
      const newShipping = await Shipping.create({
        user: req.user.id,
        cart: cart.id,
        location: req.body.location,
        charge: 100,
        paymentMethod: req.body.paymentMethod,
        deliveryStatus: "OrderFulfilled",
        netTotal: 100 + parseFloat(cart.total),
      });
      console.log(newShipping);
    }
  } catch (err) {
    console.log(err.message);
  }
};

//Update Shipping when deliveryStatus changes
controller.shippingUpdate = async (req, res) => {
  try {
    const shipping = await Shipping.findOne({ user: req.params.id });
    if (!shipping) {
      return res.json("Shipping wasn't found");
    } else {
      const updatedShipping = await Shipping.findOneAndUpdate(
        { user: req.body.updateID },
        {
          deliveryStatus: req.body.deliveryStatus,
        },
        { new: true }
      );
      console.log(updatedShipping);
    }
  } catch (err) {
    console.log(err.message);
  }
};

//Admin and Vendor view all carts
controller.viewCart = async (req, res) => {
  let carts;
  if (req.user.user_type === "super-admin" || req.user.user_type === "admin") {
    carts = await Cart.find({ status: true })
      .sort("-createdAt")
      .populate("user");
    res.json({ count: carts.length, carts });
  } else if (req.user.user_type === "vendor") {
    carts = await Cart.find({
      createdBy: req.user.id,
      status: true,
    });
  }
  res.send(carts);
};

//Admin view all shipping
controller.viewShipping = async (req, res) => {
  cartdata = [];
  orderdata = [];

  try {
    if (
      req.user.user_type === "super-admin" ||
      req.user.user_type === "admin"
    ) {
      shippingConfirmed = await Shipping.find({
        status: true,
        deliveryStatus: "confirmed",
      })
        .sort("-createdAt")
        .populate("user");
      shippingOnTheWay = await Shipping.find({
        status: true,
        deliveryStatus: "ontheway",
      })
        .sort("-createdAt")
        .populate("user");

      res.render("admindashboard/shipping", {
        shippingOnTheWay,
        shippingConfirmed,
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = controller;
