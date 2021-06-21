const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
// import routes

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// app
const app = express();

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(()=> {
    console.log("DB Connected")
})

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})