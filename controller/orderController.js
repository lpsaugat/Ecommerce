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

module.exports = controller;
