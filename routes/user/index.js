'use strict'

const express = require('express');
const user = express.Router({ mergeParams: true });
const loginController = require('../../controllers/loginController');

user.get('/', (req, res) => {
    res.json({
        message: 'user api server'
    })
})

user.get('/login', loginController.userLogin)

module.exports = user;
