'use strict'

const express = require('express');
const user = express.Router({ mergeParams: true });
const userController = require('../../controllers/userController');

user.get('/', (req, res) => {
    res.json({
        message: 'user api server'
    })
})

user.get('/login', userController.userLogin)

module.exports = user;
