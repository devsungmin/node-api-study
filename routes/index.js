'use strict'
const express = require('express');
const routes = express.Router({ mergeParams: true });

const userRouter = require("./user");

routes.use("/user", userRouter);

routes.get("/", (req, res) => {
    res.json({
        message: "hello! express server test"
    })
});


module.exports = routes