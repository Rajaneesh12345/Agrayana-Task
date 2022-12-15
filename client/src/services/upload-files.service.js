import axios from 'axios'

class UploadFilesService {
	async upload(file, onUploadProgress) {
		let formData = new FormData()

		formData.append('file', file)

		const poi = await axios.post('http://localhost:8000/extract', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
		return poi
	}

	async getFiles() {
		const files = await axios.get('http://localhost:8000/files')
		return files
	}
}

export default new UploadFilesService()
