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

async function getAllUsers(req,res) {
    User.find()
    .then((users) => {
        console.log('All users have been found', users)
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
    User.findOne({email:req.body.email})
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

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    loginUser
}