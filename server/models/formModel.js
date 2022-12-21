const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		business: { type: String, required: true },
		adress: { type: String, required: true },
		phone: { type: String, required: true },
		service: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Form', FormSchema)
