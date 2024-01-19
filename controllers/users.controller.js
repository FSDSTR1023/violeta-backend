const mongoose = require('mongoose')
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

async function loginUser(req,res) {
    User.findOne({nickname:req.body.nickname})
    .then((user) => {
       if (!user) {
        return res.status(404).json({msg:'User not found'})
        }
        if((!req.body.password)||(user.password != req.body.password)  ){
        return res.status(403).json({msg:'Forbidden'})
        
        }
        res.status(200).json({msg: 'Login succesful'})
    })
    .catch((err) => {
        console.log(err,'not correct')
        res.status(400).json(err)
    })
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
    deleteUser,
    addFriend,
    getUserFriends,
    removeFriend
}