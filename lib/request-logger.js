// Description: Logs incoming requests to the console
const requestLogger = function (req, res, next) {
	console.log('\n===== Incoming Request =====\n')
	console.log(`${new Date()}`)
	console.log(`${req.method} ${req.url}`)
	console.log(`body: ${JSON.stringify(req.body)}`)
	console.log('\n============================\n')
	next()
}

//export the requestLogger
module.exports = requestLogger
