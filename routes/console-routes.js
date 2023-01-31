// require Express and handle404
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model and requireToken
const Console = require('../models/console')
const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /consoles
router.get('/consoles', requireToken, (req, res, next) => {
	Console.find()
		.then((consoles) => {
			return consoles.map((console) => console)
		})
		.then((consoles) => res.status(200).json({ consoles: consoles }))
		.catch(next)
})

// SHOW
// GET /consoles/ id here
router.get('/consoles/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Console.findById(req.params.id)
		.then(handle404)
		.then((console) => res.status(200).json({ console: console }))
		.catch(next)
})

// CREATE
// POST /consoles
router.post('/consoles', requireToken, (req, res, next) => {
	Console.create(req.body.console)
		.then((console) => {
			res.status(201).json({ console: console })
		})
		.catch(next)
})

// UPDATE
// PATCH /consoles/ id here
router.patch('/consoles/:id', requireToken, (req, res, next) => {
	Console.findById(req.params.id)
		.then(handle404)
		.then((console) => {
			return console.updateOne(req.body.console)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /consoles/ id here
router.delete('/consoles/:id', requireToken, (req, res, next) => {
	Console.findById(req.params.id)
		.then(handle404)
		.then((console) => {
			console.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// exporting the router
module.exports = router
