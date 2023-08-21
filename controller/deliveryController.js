const Delivery = require("../models/Delivery");

const controller = {};

//Make a Delivery
controller.deliveryAdd = async (req, res) => {
  try {
    const newDelivery = await Delivery.create({
      ...req.body,
    });
    res.status(200).json(newDelivery);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

//Update and Edit Delivery
controller.deliveryEdit = async (req, res) => {
  try {
    const getDelivery = await Delivery.findOne({ _id: req.params.id });
    if (!getDelivery) {
      return res
        .status(404)
        .json({ message: `No Delivery found with id ${req.params.id}` });
    }
    const updatedDelivery = await Delivery.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },

      { new: true, runValidators: true }
    );

    res.status(200).json(updatedDelivery);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete Delivery
controller.deliveryDelete = async (req, res) => {
  try {
    const getDelivery = await Delivery.findOne({ _id: req.params.id });
    if (!getDelivery) {
      return res
        .status(404)
        .json({ message: `No Delivery found with id ${req.params.id}` });
    }

    const deletedDelivery = await Delivery.findOneAndDelete({
      _id: req.params.id,
    });
    console.log(deletedDelivery);
    res.status(200).json(deletedDelivery);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Add Delivery Page
controller.deliveryAddPage = async (req, res) => {
  try {
    res.render("admindashboard/deliveryAdd");
  } catch (err) {
    res.status(404).json(err);
  }
};

//Delivery Update and Edit page
controller.deliveryEditPage = async (req, res) => {
  try {
    var delivery = await Delivery.findOne({ _id: req.params.id });
    res.render("admindashboard/deliveryEdit", { delivery });
  } catch (err) {
    res.status(404).json(err);
  }
};

//View all Delivery
controller.deliveryView = async (req, res) => {
  try {
    var delivery = await Delivery.find({ isActive: true }).sort("-createdAt");
    res.render("admindashboard/alldelivery", { delivery });
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = controller;
