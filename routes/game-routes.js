//require express
const express = require('express')

//make a router
const router = express.Router()

// require console model and custom error handler and requireToken
const Console = require('../models/console')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

// CREATE
// POST /games/
router.post('/games', requireToken, (req, res, next) => {
	const consoleId = req.body.game.consoleId
    const game = req.body.game
    game.owner = req.user._id
	Console.findById(consoleId)
		.then(handle404)
		.then((console) => {
			console.games.push(req.body.game)
			return console.save()
		})
		.then((console) => res.status(201).json({ console: console }))
		.catch(next)
})

// UPDATE
// PATCH /games/:id
router.patch('/games/:gameId', requireToken, (req, res, next) => {
	const consoleId = req.body.game.consoleId
	Console.findById(consoleId)
		.then(handle404)
		.then((console) => {
			const game = console.games.id(req.params.gameId)
			game.set(req.body.game)
			return console.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /games/:id
router.delete('/games/:gameId', requireToken, (req, res, next) => {
	const consoleId = req.body.game.consoleId
	Console.findById(consoleId)
		.then(handle404)
		.then((console) => {
			console.games.id(req.params.gameId).remove()
			return console.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

//export router
module.exports = router
