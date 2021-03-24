'use strict'
const express = require("express");
const app = express();
const routes = require('./routes');
const sequelize = require('./models').sequelize;

app.use('/api', routes);

sequelize.sync();

app.listen(3000, (req, res) => {
    console.log("Server connection")
})