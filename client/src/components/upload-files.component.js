import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

import UploadService from '../services/upload-files.service'

export default class UploadFiles extends Component {
	constructor(props) {
		super(props)
		this.upload = this.upload.bind(this)
		this.onDrop = this.onDrop.bind(this)
		this.delete = this.delete.bind(this)

		this.state = {
			selectedFiles: undefined,
			currentFile: undefined,
			progress: 0,
			message: '',
			fileInfos: {}
		}
	}

	upload() {
		let currentFile = this.state.selectedFiles[0]

		this.setState({
			progress: 0,
			currentFile: currentFile
		})

		UploadService.upload(currentFile, event => {
			this.setState({
				progress: Math.round((100 * event.loaded) / event.total)
			})
		})
			.then(response => {
				this.setState({
					message: response.data.message
				})
				return UploadService.getFiles()
				// return here
			})
			.then(files => {
				this.setState({
					fileInfos: files.data.data
				})
				this.props.setName(this.state.fileInfos.name)
				this.props.setBusiness(this.state.fileInfos.business)
				this.props.setAdress(this.state.fileInfos.adress)
				this.props.setPhone(this.state.fileInfos.phone)
				this.props.setService(this.state.fileInfos.service)
			})
			.catch(() => {
				this.setState({
					progress: 0,
					message: 'Could not upload the file!',
					currentFile: undefined
				})
			})
	}

	delete() {
		this.setState({
			selectedFiles: undefined,
			currentFile: undefined
		})
	}

	onDrop(files) {
		if (files.length > 0) {
			this.setState({ selectedFiles: files })
		}
	}

	render() {
		const { selectedFiles, currentFile, progress } = this.state

		return (
			<div>
				{currentFile && (
					<div className="progress mb-3">
						<div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: progress + '%' }}>
							{progress}%
						</div>
					</div>
				)}

				<Dropzone onDrop={this.onDrop}>
					{({ getRootProps, getInputProps }) => (
						<section>
							<div {...getRootProps({ className: 'dropzone' })}>
								<input {...getInputProps()} />
								{selectedFiles && selectedFiles[0].name ? <div className="selected-file">{selectedFiles && selectedFiles[0].name}</div> : 'Drag and drop file here, or click to select file'}
							</div>
							<aside className="selected-file-wrapper">
								<button className="btn btn-success btn-lg m-4" disabled={!selectedFiles} onClick={this.upload}>
									Extract
								</button>
								<button className="btn btn-lg btn-danger m-4" disabled={!selectedFiles} onClick={this.delete}>
									Discard
								</button>
							</aside>
						</section>
					)}
				</Dropzone>

				{currentFile && (
					<div className="text-center alert alert-light" role="alert">
						Text Extracted Successfully
					</div>
				)}
			</div>
		)
	}
}
