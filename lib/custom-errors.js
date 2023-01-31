// This file contains custom errors that can be thrown by the application
class DocumentNotFoundError extends Error {
	constructor() {
		super()
		this.name = 'DocumentNotFoundError'
		this.message = "The provided ID doesn't match any documents"
	}
}

//handle404
const handle404 = (record) => {
	if (!record) {
		throw new DocumentNotFoundError()
	} else {
		return record
	}
}

// Export the custom errors
module.exports = {
	handle404,
}
