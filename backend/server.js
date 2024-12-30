const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const cors = require('cors');

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(cors());
app.use(express.json())
app.use('/task',require('./routes/taskRouter'));
app.use('/user',require('./routes/userRouter'));

app.listen(PORT,console.log("server at "+PORT));