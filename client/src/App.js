import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useImmerReducer } from 'use-immer'
import StateContext from './services/StateContext'
import DispatchContext from './services/DispatchContext'

import UploadFiles from './components/upload-files.component'
import FormUpload from './components/form-upload.component'
import Search from './components/search.component'

function App() {
	const [everything, setEverything] = useState(false)
	const [name, setName] = useState('')
	const [business, setBusiness] = useState('')
	const [adress, setAdress] = useState('')
	const [phone, setPhone] = useState('')
	const [service, setService] = useState('')

	const initialState = {
		name: '',
		business: '',
		adress: '',
		phone: '',
		service: '',
		everything: false
	}

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'setName':
				draft.name = action.value
				return
			case 'setBusiness':
				draft.business = action.value
				return
			case 'setAdress':
				draft.adress = action.value
				return
			case 'setPhone':
				draft.phone = action.value
				return
			case 'setService':
				draft.service = action.value
				return
			default:
				return
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState)

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<div className="row d-flex main">
					<div className="col m-3">
						<UploadFiles setEverything={setEverything} everything={everything} setName={setName} setBusiness={setBusiness} setAdress={setAdress} setPhone={setPhone} setService={setService} />
					</div>
					<div className="col ">
						<div>
							<FormUpload everything={everything} setEverything={setEverything} name={name} setName={setName} business={business} setBusiness={setBusiness} adress={adress} setAdress={setAdress} phone={phone} setPhone={setPhone} service={service} setService={setService} />
						</div>
						<hr className="bg-dark"></hr>
						<div>
							<Search setEverything={setEverything} everything={everything} setName={setName} setBusiness={setBusiness} setAdress={setAdress} setPhone={setPhone} setService={setService} />
						</div>
					</div>
				</div>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export default App
