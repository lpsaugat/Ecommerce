const connection = require("express-myconnection");

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

controller.package = (req, res) => {
    res.render("Package")
};


module.exports = controller;
