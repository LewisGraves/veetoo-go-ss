//naming the database
const mongooseBaseName = 'v2-go'
// create the database URI for development and test
const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test: `mongodb://localhost/${mongooseBaseName}-test`,
}
// Identify if development environment is test or development
const localDb = process.env.TESTENV ? database.test : database.development
// Check for production environment, otherwise use development database
const currentDb = process.env.DB_URI || localDb
// export the database
module.exports = currentDb