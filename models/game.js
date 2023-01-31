//require mongoose
const mongoose = require('mongoose')

//Game schema
const gameSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		developer: {
			type: String,
			required: false,
		},
		publisher: {
			type: String,
			required: false,
		},
		releaseDate: {
			type: String,
			required: false,
		},
		genre: {
			type: String,
			required: false,
		},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	}
)

//Exporting Game model
module.exports = gameSchema