const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/users', userController.getAllUser)
router.get('/user/:id', userController.getUserById)
router.put('/user/:id', userController.updateUser)
router.post('/user/store', userController.addUser)
router.delete('/user/:id/delete', userController.deleteUser)

module.exports = router