const connection = require("express-myconnection");
const User = require("../models/User");
const Carousel = require("../models/Carousel");
const Product = require("../models/Products");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
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

controller.home = async (req, res) => {
  try {
    const data = await Carousel.find();
    console.log(data);
    res.render("Homepage", { data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

controller.aboutus = (req, res) => {
  res.render("AboutUs");
};

controller.slider = (req, res) => {
  res.render("slider");
};

controller.subscription = (req, res) => {
  res.render("subscription");
};

controller.products = (req, res) => {
  res.render("products");
};

controller.add = (req, res) => {
  const data = req.body;
  req.getConnection((err, connection) => {
    const query = connection.query(
      "INSERT INTO products set ?",
      data,
      (err, products) => {
        res.redirect("/Add_product");
        console.log("added");
      }
    );
  });
};

controller.add_product = (req, res) => {
  res.render("Add_product");
};

controller.signin = (req, res) => {
  res.render("Sign_In");
};

controller.signup = (req, res) => {
  res.render("Sign_Up");
};

controller.dashboard = (req, res) => {
  res.render("dashboard");
};

controller.mobilepassword = (req, res) => {
  res.render("mobilepassword");
};

controller.familypackages = (req, res) => {
  res.render("familypackages");
};

controller.package = (req, res) => {
  res.render("Package");
};

controller.singlepackage = (req, res) => {
  res.render("singlepackage");
};

controller.singleproduct = (req, res) => {
  res.render("singleproduct");
};

controller.cart = (req, res) => {
  res.render("cart");
};

controller.billing = (req, res) => {
  res.render("billing");
};

controller.payments = (req, res) => {
  res.render("payments");
};

controller.success = (req, res) => {
  res.render("success");
};

controller.orderconfirmation = (req, res) => {
  res.render("orderconfirmation");
};

controller.vendor = (req, res) => {
  res.render("vendor");
};

//SignUp from User
controller.createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create New User
    console.log("hi");
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ),
    });
    console.log(newUser);
    res.json(newUser);
  } else {
    //User Already Exists
    res.json({
      msg: "User already exists",
      success: false,
    });
  }
};

//SignIn from User
controller.checkUser = async (req, res) => {
  // get the email and password from the request body
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);

  const user = await User.findOne({ email });
  console.log(user);
  console.log(password);
  try {
    // query the database for the user with the specified email address
    const user = await User.findOne({ email });

    console.log("user here");
    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);
    console.log(hashedpassword);
    if (!user) {
      // if no user is found, return an error response
      return res.status(401).send({ message: "Invalidd email or password" });
    }

    // check if the password matches
    if (req.body.password !== hashedpassword) {
      // if the password doesn't match, return an error response
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // if the email and password are valid, return a success response
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    console.log(accessToken);
    res.cookie(accessToken);

    // user = { password, ...others };
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    // if there's an error while querying the database, return an error response
    console.log(error);
    // return res.status(500).send({ error });
  }
};

//Writing in Carousel
controller.carouselwriting = async (req, res) => {
  try {
    const newCarousel = await Carousel.create({
      Name: req.body.Name,
      Heading: req.body.Heading,
      Offer: req.body.Offer,
      BackgroundImage: req.file.path,
    });
    res.json(newCarousel);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Carousel Writings Update and Change
controller.carouselupdate = async (req, res) => {
  const filter = { Name: req.body.Name };
  console.log(filter);
  const update = { ...req.body, BackgroundImage: req.file.path };
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

//Product details
controller.productdetails = async (req, res) => {
  try {
    const newProduct = await Product.create({
      Name: req.body.Name,
      Description: req.body.Description,
      Price: req.body.Price,
      Quantity: req.body.Quantity,
      Priceper: req.body.Priceper,

      Image: req.file.path,
    });
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Product Details Update and Change
controller.productupdate = async (req, res) => {
  const filter = req.params.id;
  console.log(filter);
  const update = { ...req.body, Image: req.file.path };
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,

      { new: true }
    );
    console.log(updatedProduct);

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//Delete a Product

controller.productdelete = async (req, res) => {
  try {
    const deletedProduct = await User.findOneAndDelete(req.params.id);
    if (!deletedProduct) {
      // Return a 404 response if the product is not found
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res.status(200).json({ message: "Product deleted" });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json(err);
  }
};
controller.test = (req, res) => {
  res.render("test");
};
module.exports = controller;
