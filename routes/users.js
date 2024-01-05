const express = require('express');
const router = express.Router()
const UserController = require('../controllers/users.controller')

router.post("/", UserController.createUser)

router.get("/", UserController.getAllUsers)

router.get("/", UserController.getUserById)

router.post("/", UserController.loginUser)

module.exports = router;