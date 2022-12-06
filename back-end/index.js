require("dotenv").config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use('/users/', userRoutes);
app.use('/login/', authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening port on ${port}...`));