const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // invalid username (same username)
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error : 'username must be unique'
        })
    }

    const saltRounds = 10
    // pwd not saved, hash of pwd saved instead
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    res.json(users)
})

module.exports = usersRouter

