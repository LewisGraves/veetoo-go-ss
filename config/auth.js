// Require the needed npm packages
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create a secret to be used to encrypt/decrypt the token
const secret = process.env.JWT_SECRET || 'v2 go is the best'

// Require the specific `strategy` we'll use to authenticate
// Require the method that will handle extracting the token from each of the requests sent by clients
const { Strategy, ExtractJwt } = require('passport-jwt')

// Minimum required options for passport-jwt
const opts = {
	// Tell passport to look for the token in the authorization header
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// Tell passport where to find the secret
	secretOrKey: secret,
}

// Require the user model
const User = require('../models/user')

// Create a new strategy using the options we defined above
const strategy = new Strategy(opts, function (jwt_payload, done) {
	// Find the user in the database using the id from the token
	User.findById(jwt_payload.id)
		// If the user is found, return the user
		.then((user) => done(null, user))
		// If there was an error, pass it to done to be handled by our error handlers in Express
		.catch((err) => done(err))
})

// Tell passport to use the strategy we created above
passport.use(strategy)

// Initialize passport
passport.initialize()

// Create a middleware function that will be used to protect routes
const requireToken = passport.authenticate('jwt', { session: false })

// Create a function that will be used to create a token for a user
const createUserToken = (req, user) => {
	// Check if the user exists and if the password is correct
    console.log(req.body)
	if (
		!user || !req.body.credentials.password || !bcrypt.compareSync(req.body.credentials.password, user.password)
	) {
		const err = new Error('The username or password is incorrect')
		err.statusCode = 422
		throw err
	}
	// If no error was thrown, we create the token from user's id and return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 })
}

// Export the middleware and the function
module.exports = {
	requireToken,
	createUserToken,
}