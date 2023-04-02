const express = require('express')
const mysql = require('mysql')
myConnection = require('express-myconnection');
path = require('path')
morgan = require('morgan');
const mongo = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongo
.connect(process.env.MONGO_URL)
.then(()=>console.log("DBconnection Successful") ).catch((err)=>{
    console.log(err);
});

app = express()



const customer_route = require('./routes/customer_route');
const { resourceUsage } = require('process');

// app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'household'
// },'single'));
// // app.use(express.urlencoded({extended: false}));

app.use('/public', express.static('public'));

app.use('/', customer_route);

// app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'household'
// },'single'));
// app.use(express.urlencoded({extended: false}));


app.set('port', process.env.PORT || 3000,);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.listen(app.get('port')
// , '192.168.101.14' 
);
