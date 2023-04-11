const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const mysql = require('mysql')
myConnection = require('express-myconnection');
path = require('path')
morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');



const app = express() 
app.use(express.json())








const customer_route = require('./routes/customer_route');
 const { resourceUsage } = require('process');

 

app.use('/public', express.static('public'));

app.use('/', customer_route);


// app.set('port', process.env.PORT || 3000,);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


mongoose 
.connect(process.env.MONGO_URL)
.then(()=>console.log("DBconnection Successful") ).catch((err)=>{
    console.log(err);
});

const ip = require('ip');


app.listen(3000, ip.address(), () => console.log(`The server is running on port ${process.env.PORT}`))

// mongoose.connection.once('open', () => {
//     app.listen(app.get('port')
// , '192.168.101.14' 
// );
// })





