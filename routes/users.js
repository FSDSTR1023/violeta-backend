const express = require('express');
const router = express.Router()
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../controllers/auth.controller');

router.post('/', usersController.createUser);
router.put('/:id', usersController.editUserProfile);
router.get('/', usersController.getAllUsers);
router.get('/profile', authMiddleware, usersController.profileUser);
router.get('/:id', usersController.getUserById);
router.post('/login', usersController.loginUser);
router.post('/logout', usersController.logOut);
router.delete('/:id', usersController.deleteUser);
router.post('/add-friend/:id', usersController.addFriend);
router.get('/friends/:id', usersController.getUserFriends);
router.delete('/remove-friend/:id', usersController.removeFriend);


module.exports = router;