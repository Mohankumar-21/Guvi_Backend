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