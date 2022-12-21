import React, { useState } from 'react'

import axios from 'axios'

function FormFunction(props) {
	const [saved, setSaved] = useState(false)

	function removeAll(e) {
		window.location.reload()
	}

	async function handleSubmit(e) {
		e.preventDefault()
		// console.log(e)
		await axios
			.post('http://localhost:8000/save', {
				name: props.name,
				business: props.business,
				adress: props.adress,
				phone: props.phone,
				service: props.service
			})
			.then(res => {
				setSaved(true)
				window.location.reload()
			})
	}

	return (
		<div className="container mt-3">
			<form onSubmit={handleSubmit}>
				<div className="form-group row">
					<label htmlFor="name" className="col-sm-2 col-form-label">
						Name
					</label>
					<div className="col-sm-10">
						<input
							value={props.name}
							onChange={e => {
								props.setName(e.target.value)
							}}
							type="text"
							className="form-control"
							id="name"
							placeholder="Enter Name"
							required
						/>
					</div>
				</div>

				<div className="form-group row">
					<label htmlFor="business" className="col-sm-2 col-form-label">
						Business
					</label>
					<div className="col-sm-10">
						<input
							value={props.business}
							onChange={e => {
								props.setBusiness(e.target.value)
							}}
							type="text"
							className="form-control"
							id="business"
							placeholder="Enter Business"
							required
						/>
					</div>
				</div>

				<div className="form-group row">
					<label htmlFor="adress" className="col-sm-2 col-form-label">
						Adress
					</label>
					<div className="col-sm-10">
						<input
							value={props.adress}
							onChange={e => {
								props.setadress(e.target.value)
							}}
							type="text"
							className="form-control"
							id="adress"
							placeholder="Enter adress"
							required
						/>
					</div>
				</div>

				<div className="form-group row">
					<label htmlFor="phone" className="col-sm-2 col-form-label">
						Phone
					</label>
					<div className="col-sm-10">
						<input
							value={props.phone}
							onChange={e => {
								props.setPhone(e.target.value)
							}}
							type="text"
							className="form-control"
							id="phone"
							placeholder="Enter phone"
							required
						/>
					</div>
				</div>

				<div className="form-group row">
					<label htmlFor="service" className="col-sm-2 col-form-label">
						Service
					</label>
					<div className="col-sm-10">
						<input
							value={props.service}
							onChange={e => {
								props.setService(e.target.value)
							}}
							type="text"
							className="form-control"
							id="service"
							placeholder="Enter Service"
							required
						/>
					</div>
				</div>

				<div className="d-flex justify-content-around">
					<button type="submit" className="btn btn-primary btn-lg ">
						Save
					</button>
					<button className="btn btn-lg btn-danger" onClick={removeAll}>
						Clear
					</button>
				</div>
			</form>
			{saved && (
				<div className="text-center alert alert-light" role="alert">
					Data Saved Successfully
				</div>
			)}
		</div>
	)
}

export default FormFunction
