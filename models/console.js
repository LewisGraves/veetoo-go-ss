// require mongoose
const mongoose = require('mongoose')
const gameSchema = require('./game')

// Getting the Schema
const Schema = mongoose.Schema

// Console Schema
const consoleSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		model: {
			type: String,
			required: false,
		},
		manufacturer: {
			type: String,
			required: false,
		},
		generation: {
			type: String,
			required: false,
		},
		releaseDate: {
			type: String,
			required: false,
		},
		region: {
			type: String,
			required: false,
		},
		backwardsCompatibility: {
			type: String,
			required: false,
		},
		working: {
			type: String,
			required: false,
		},
		games: [gameSchema]
	},
	{
		timestamps: true,
	}
)

// Creating the Console model
const Console = mongoose.model('Console', consoleSchema)

// Exporting Console model
module.exports = Console
