const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
myConnection = require("express-myconnection");
const fileUpload = require("express-fileupload");
path = require("path");
morgan = require("morgan");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const _ = require("lodash");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dv0poigfl",
  api_key: "429572556739323",
  api_secret: "GK4nxkk850713C1knFAiYO0abuk",
});

const app = express();
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, createParentPath: true }));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const customer_route = require("./routes/customer_route");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const adminRoute = require("./routes/adminRoute");
const packageRoute = require("./routes/packageRoute");
const orderRoute = require("./routes/orderRoute");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/error-handler");

app.use(cookieparser());

//Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use("/public", express.static("public"));
app.use("/CSS", express.static("public/CSS"));
app.use("/JS", express.static("public/JS"));

app.use("/", customer_route);
app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", adminRoute);
app.use("/", packageRoute);
app.use("/", orderRoute);

// app.set('port', process.env.PORT || 3000,);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBconnection Successful"))
  .catch((err) => {
    console.log(err);
  });

const ip = require("ip");

app.listen(3000, ip.address(), () =>
  console.log(
    `The server is running on port ${process.env.PORT} with ip ${ip.address()}`
  )
);

// app.listen(3000);
