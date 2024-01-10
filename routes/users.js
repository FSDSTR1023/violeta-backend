const express = require('express');
const router = express.Router()
const usersController = require('../controllers/users.controller')

router.post('/', usersController.createUser);
router.put('/edit/:id', usersController.editUserProfile);
router.get('/allusers', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/login', usersController.loginUser);
router.delete('/:id', usersController.deleteUser);
router.post('/add-friend/:id', usersController.addFriend);
router.get('/friends/:id', usersController.getUserFriends);
router.delete('/remove-friend/:id', usersController.removeFriend);

module.exports = router;