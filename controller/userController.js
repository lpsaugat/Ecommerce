const connection = require("express-myconnection");
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
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

controller.signin = (req, res) => {
  res.render("Sign_In");
};

controller.signup = (req, res) => {
  res.render("Sign_Up");
};

//SignUp from User
controller.createUser = async (req, res) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create New User
    const user_type = req.body.user_type;
    if (["admin", "super-admin"].includes(user_type)) {
      return res.status(403).json({
        msg: "Unauthorized",
        success: false,
      });
    }
    console.log("hi");
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      user_type: req.body.user_type,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ),
    });
    console.log(newUser);
    res.status(201).json(newUser);
  } else {
    //User Already Exists
    res.status(400).json({
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

  const user = await User.findOne({ email });
  if (!user) {
    // if no user is found, return an error response
    return res.status(404).send({ message: "Invalid email or password" });
  }
  // if (user.status === false) {
  //   // if no user is found, return an error response
  //   return res
  //     .status(403)
  //     .send({ message: "Unauthorized, please contact admin" });
  // }
  try {
    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    // check if the password matches
    if (req.body.password !== hashedpassword) {
      // if the password doesn't match, return an error response
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // if the email and password are valid, return a success response
    const accessToken = jwt.sign(
      {
        id: user._id,
        user_type: user.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.cookie("Token", { value: accessToken });

    // user = { password, ...others };
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    // if there's an error while querying the database, return an error response
    console.log(error);
    // return res.status(500).send({ error });
  }
};

//Forget Password

controller.forgetPassword = async (req, res) => {
  try {
    email = req.body.email;

    const user = User.findOne({ email: email });
    if (user) {
      const token = randomstring.generate();
      console.log(token);
      await User.updateOne({ email: email }, { $set: { token: token } });
      const msg = {
        to: "lpsaugat@gmail.com",
        from: "infoprabidhilabs@gmail.com",
        subject: "Hello from SendGrid!",
        html: `<p> Hello,
          ${user.name}
          ,Please copy the link and reset your password <a href="http://192.168.1.88:3000/reset-password?token=
          ${token}"> and reset your password</a>`,
      };
      sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error(error));
      res
        .status(200)
        .send({ success: true, message: "Please check your email" });
    } else {
      res
        .status(400)
        .send({ success: true, message: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// const SendResetmail = async (req, res, name, email, token) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: "kristopher.rippin@ethereal.email",
//         pass: "hJDjQWmrHSBNhZAzYJ",
//       },
//       socketTimeout: 50000, // Increase timeout value
//       connectionTimeout: 50000, // Increase timeout value
//     });
//     const mailOptions = {
//       from: "kristopher.rippin@ethereal.email",
//       to: "lpsaugat@gmail.com",
//       subject: "For Reset Password",
//       html:
//         `<p> Hello,` +
//         name +
//         `,Please copy the link and reset your password <a href="http://192.168.1.88:3000/reset-password?token=` +
//         token`"> and reset your password</a>`,
//       // text: "sdfsd",
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Mail has been sent", info.response);
//       }
//     });
//   } catch (error) {
//     return res.send({ success: false, message: error.message });
//   }
// };

//Logout
controller.logout = async (req, res, next) => {
  for (const cookieName in req.cookies) {
    res.cookie(cookieName, "", { expires: new Date(0) });
  }
  res.redirect("/");
};

module.exports = controller;
