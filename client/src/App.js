import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import UploadFiles from './components/upload-files.component'
import FormUpload from './components/form-upload.component'
import Search from './components/search.component'

function App() {
	const [name, setName] = useState('')
	const [business, setBusiness] = useState('')
	const [adress, setAdress] = useState('')
	const [phone, setPhone] = useState('')
	const [service, setService] = useState('')

	return (
		<div className="row d-flex main">
			<div className="col m-3">
				<UploadFiles setName={setName} setBusiness={setBusiness} setAdress={setAdress} setPhone={setPhone} setService={setService} />
			</div>
			<div className="col ">
				<div>
					<FormUpload name={name} setName={setName} business={business} setBusiness={setBusiness} adress={adress} setAdress={setAdress} phone={phone} setPhone={setPhone} service={service} setService={setService} />
				</div>
				<hr className="bg-dark"></hr>
				<div>
					<Search setName={setName} setBusiness={setBusiness} setAdress={setAdress} setPhone={setPhone} setService={setService} />
				</div>
			</div>
		</div>
	)
}

export default App
