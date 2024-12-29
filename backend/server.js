const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json())


app.listen(PORT,console.log("server at "+PORT));