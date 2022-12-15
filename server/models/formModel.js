const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema(
	{
		name: String,
		business: String,
		adress: String,
		phone: String,
		service: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Form', FormSchema)
