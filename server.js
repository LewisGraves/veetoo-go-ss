// require express mongoose cors and the URI
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./config/db')

// require the routes
const requestLogger = require('./lib/request-logger')
const consoleSeed = require('./lib/console-seed')
const consoleRoutes = require('./routes/console-routes')
const gameRoutes = require('./routes/game-routes')
const userRoutes = require('./routes/user-routes')

// declare the port
const PORT = 8000

// set mongoose to use the global promise library
mongoose.set('strictQuery', true)

// Create connection with the URI from config/db.js
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Using the express function create an express app
const app = express()

// before any request come in whitelist our front end localhost
app.use(cors({ origin: `http://127.0.0.1:5500` }))

// use express.json() to parse the body of the request and pass it to the requestLogger
app.use(express.json())
app.use(requestLogger)
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:3000` }))

// Pass the routes to `app.use` for Express to use them
app.use('/seed', consoleSeed)
app.use(consoleRoutes)
app.use(gameRoutes)
app.use(userRoutes)

// Listening on PORT 8000
app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})

// export the app
module.exports = app