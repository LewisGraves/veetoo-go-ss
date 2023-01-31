//require express and bcrypt
const express = require('express')
const bcrypt = require('bcrypt')

//create router
const router = express.Router()

// require the User model and requireToken
const User = require('../models/user')
const { createUserToken } = require('../config/auth')

// SIGN UP
// POST /sign-up
router.post('/sign-up', (req, res, next) => {
	bcrypt
		.hash(req.body.credentials.password, 10)
		// return a new object with the email and hashed password
		.then((hash) =>
			({
				email: req.body.credentials.email,
				password: hash,
			})
		)
		// create user with provided email and hashed password
		.then((user) => User.create(user))
		// send the new user object back with status 201
		.then((user) => res.status(201).json(user))
		// pass errors
		.catch(next)
})

// SIGN IN
// POST /sign-in
router.post('/sign-in', (req, res, next) => {
	User.findOne({ email: req.body.credentials.email })
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		// createUserToken will either throw an error that
		// will be caught by our error handler or send back
		// a token that we'll in turn send to the client.
		.then((token) => res.json({ token }))
		.catch(next)
})

//export router
module.exports = router
