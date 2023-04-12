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
    // const email  = req.body.email;
    // const findUser = await User.findOne(email);
    // if(!findUser){
        //Create New User
    console.log("hi")
        const newUser = await User.create({...req.body});
        console.log(newUser)
        res.json(newUser)
    // }
    // else{
    //     //User Already Exists
    //     res.json({
    //         msg: "User already exists",
    //         success:false,
    //     })
    // }
}

 module.exports = controller;
