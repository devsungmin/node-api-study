'use strict'

const express = require('express');
const user = express.Router({ mergeParams: true });
const userController = require('../../controllers/userController');

user.get('/', (req, res) => {
    res.json({
        message: 'user api server'
    })
})

user.post('/login', userController.userLogin)
user.post('/register', userController.singup)


module.exports = user;
