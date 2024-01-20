const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function createUser(req,res) {
    User.create(req.body)
    .then((user) => {
        console.log('The user has been created', user)
        res.status(200).json(user)
    })
    .catch((err) => {
        console.log(err,'Could not create a new user, please try again')
        res.status(400).json(err)
    })
}

async function editUserProfile(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        console.log('User profile updated:', user);
        res.status(200).json(user);
    } catch (err) {
        console.error('Error updating user profile:', err.message);
        res.status(400).json({ error: 'Could not update user profile, please try again' });
    }
}

async function getAllUsers(req,res) {
    User.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        console.log(err,'No user found')
        res.status(400).json(err)
    })
}

async function getUserById(req,res) {
    User.findById(req.params.id)
    .then((user) => {
        console.log('User found', user)
        res.status(200).json(user)
    })
    .catch((err) => {
        console.log(err,'Not user found')
        res.status(400).json(err)
    })
}

async function loginUser(req, res) {
    const { nickname, password } = req.body;
  
    User.findOne({ nickname })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
  
        if (user.password !== password) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
  
        jwt.sign(
          { id: user._id, nickname: user.nickname },
          process.env.JWT_SECRET_KEY,
          (err, token) => {
            if (err) {
              return res.status(401).json({ error: err.message });
            } else {
              res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                expires: new Date('2100-12-17T03:24:00'),
              }).status(201).send();
            }
          }
        );
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

async function profileUser(req, res) {
    const user = users.find((user) => user.id === req.user.id);
    res.json({ ...user, password: undefined });
}

async function logOut(req, res) {
    res.clearCookie("token").send();
}

async function deleteUser(req, res) {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        console.log('User deleted:', user);
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(400).json({ error: 'Could not delete user, please try again' });
    }
}

async function addFriend(req, res) {
    const userId = req.params.id;
    const { friendId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ msg: 'Friend not found' });
        }

        user.friends.push(friendId);
        await user.save();

        console.log('Friend added successfully');
        res.status(200).json({ msg: 'Friend added successfully' });
    } catch (err) {
        console.error('Error adding friend:', err.message);
        res.status(400).json({ error: 'Could not add friend, please try again' });
    }
}

async function getUserFriends(req, res) {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const userFriends = user.friends; // Habrá que añadir un campo "friends" en el modelo de usuario
        console.log('User friends retrieved:', userFriends);
        res.status(200).json(userFriends);
    } catch (err) {
        console.error('Error retrieving user friends:', err.message);
        res.status(400).json({ error: 'Could not retrieve user friends, please try again' });
    }
}

async function removeFriend(req, res) {
    const userId = req.params.id;
    const { friendId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Verifica si el amigo está en la lista de amigos antes de intentar eliminarlo
        if (!user.friends.includes(friendId)) {
            return res.status(404).json({ msg: 'Friend not found in the user\'s friend list' });
        }

        // Elimina al amigo de la lista de amigos
        user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        await user.save();

        console.log('Friend removed successfully');
        res.status(200).json({ msg: 'Friend removed successfully' });
    } catch (err) {
        console.error('Error removing friend:', err.message);
        res.status(400).json({ error: 'Could not remove friend, please try again' });
    }
}

module.exports = {
    createUser,
    editUserProfile,
    getAllUsers,
    getUserById,
    loginUser,
    profileUser,
    logOut,
    deleteUser,
    addFriend,
    getUserFriends,
    removeFriend
}