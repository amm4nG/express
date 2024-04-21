const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/users', userController.getAllUser)
router.get('/user/:id', userController.getUserById)

module.exports = router