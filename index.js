'use strict'
const express = require("express");
const app = express();
const routes = require('./routes');

app.use('/api', routes);

app.listen(3000, (req, res) => {
    console.log("Server connection")
})