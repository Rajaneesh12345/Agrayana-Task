// setup express
const path = require('path')
const helmet = require('helmet')
const express = require('express')
const app = express()
const Tesseract = require('tesseract.js')
const multer = require('multer')
const cors = require('cors')
const Form = require('./models/formModel')

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/public'))

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// app.use(cookieParser())

///////////////////////////////////////////////////////////////

let extracted, name, business, adress, phone, service

app.get('/files', (req, res) => {
	res.status(200).json({
		data: {
			name,
			business,
			adress,
			phone,
			service
		}
	})
})

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({ storage })

app.post('/extract', upload.single('file'), async (req, res) => {
	await Tesseract.recognize(req.file.path, 'eng')
		.then(({ data: { text } }) => {
			extracted = text.split('\n').map(a => a.trim().split(': '))
			name = extracted[0][1]
			business = extracted[1][1]
			adress = extracted[2][1]
			phone = extracted[3][1]
			service = extracted[4][1]
		})
		.catch(err => console.log(err))
	res.status(200).json({
		success: true,
		data: {
			message: 'success',
			name,
			business,
			adress,
			phone,
			service
		}
	})
})

// let all, name, business, adress, phone, service

// Tesseract.recognize('./public/uploads/upload.jpg', 'eng')
// 	.then(({ data: { text } }) => {
// 		all = text.split('\n').map(a => a.trim().split(': '))
// 		name = all[0][1]
// 		business = all[1][1]
// 		adress = all[2][1]
// 		phone = +all[3][1]
// 		service = all[4][1]
// 		console.log(name, business, adress, phone, service)
// 	})
// 	.catch(err => console.log(err))

app.post('/save', async (req, res, next) => {
	try {
		await Form.create({
			name: req.body.name,
			business: req.body.business,
			adress: req.body.adress,
			phone: req.body.phone,
			service: req.body.service
		})
		res.status(200).json({ success: true })
	} catch (err) {
		console.log(err)
	}
})

app.post('/search', async (req, res, next) => {
	try {
		const doc = await Form.findOne(req.body)
		console.log(req.body, doc, '\n')

		res.status(200).json({ success: true, doc })
	} catch (err) {
		console.log(err)
	}
})

module.exports = app
