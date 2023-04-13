const connection = require("express-myconnection");
const User = require("../models/User")


const path = require('path')

const controller = {};

controller.home = (req, res) => {
        res.render("Homepage")
};

controller.aboutus = (req, res) => {
        res.render("AboutUs")
};

controller.slider = (req, res) => {
    res.render("slider")
};

controller.subscription = (req, res) => {
    res.render("subscription")
};

controller.products = (req, res) => {
    res.render("products")
};

controller.add = (req, res) => {
        const data = req.body;
        req.getConnection((err, connection) => {
            const query = connection.query('INSERT INTO products set ?', data, (err, products) => {
                res.redirect('/Add_product');
                console.log("added")
            })
        })
    };

controller.add_product = (req, res) => {
    res.render("Add_product")
};

controller.signin = (req, res) => {
    res.render("Sign_In")
};

controller.signup = (req, res) => {

    res.render("Sign_Up")
    
};

controller.dashboard = (req, res) => {

    res.render("dashboard")
    
};

controller.mobilepassword = (req, res) => {

    res.render("mobilepassword")
    
};


controller.familypackages = (req, res) => {
    res.render("familypackages")
    
};

controller.package = (req, res) => {
    res.render("Package")
};

controller.test = (req,res) => 
{
    res.render("test")
}

controller.singlepackage = (req,res) => 
{
    res.render("singlepackage")
}

controller.singleproduct = (req,res) => 
{
    res.render("singleproduct")
}

controller.cart = (req,res) => 
{
    res.render("cart")
}

controller.billing = (req,res) => 
{
    res.render("billing")
}

controller.payments = (req,res) => 
{
        res.render("payments")
}

controller.success = (req,res) => 
{
    res.render("success")
}

controller.orderconfirmation = (req,res) => 
{
    res.render("orderconfirmation")
}

controller.vendor = (req,res) => 
{
    res.render("vendor")
}

controller.createUser = async (req, res) => {
    const email  = req.body.email;
    const findUser = await User.findOne({email});
    if(!findUser){
        // Create New User
    console.log("hi")
    console.log(req.body)
        const newUser = await User.create({...req.body});
        console.log(newUser)
        res.json(newUser)
    }
    else{
        //User Already Exists
        res.json({
            msg: "User already exists",
            success:false,
        })
     }
}

// controller.checkUser = async (req, res) => {
//     const { email, password } = req.body; // get the email and password from the request body
//     const user = await User.findOne({ email });

//     try {
//       // query the database for the user with the specified email address
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         // if no user is found, return an error response
//         return res.status(401).send({ message: 'Invalid email or password' });
//       }
  
//       // check if the password matches
//       if (!await user.checkPassword(password)) {
//         // if the password doesn't match, return an error response
//         return res.status(401).send({ message: 'Invalid email or password' });
//       }
  
//       // if the email and password are valid, return a success response
//       return res.status(200).send({ message: 'Sign-in successful', user });
//       console.log("logged in")
  
//     } catch (error) {
//       // if there's an error while querying the database, return an error response
//       return res.status(500).send({ message: 'Internal server error' });
//     }}

 module.exports = controller;
