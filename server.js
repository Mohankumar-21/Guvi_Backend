const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv =  require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// object
const app = express();

//config
dotenv.config();

//mongodb connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

//routes
app.use('/api/v1/user', require('./routes/userRouter'));
app.use('/api/v1/user', require('./routes/profileRoute'));



//port
const PORT = process.env.PORT || 8080

//listen port
app.listen(PORT, ()=>
{
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});