const express = require('express');

const UserController = require('../Controllers/user');

const api = express.Router();



api.post('/signup', UserController.saveUser);




module.exports = api;