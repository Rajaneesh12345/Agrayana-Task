import React, { useState } from 'react'
import axios from 'axios'

function Search(props) {
	const [searchValue, setSearchValue] = useState('')
	const [searchField, setSearchField] = useState('name')

	async function handleSubmit(e) {
		console.log('handleSubmit')
		e.preventDefault()
		const obj = {}
		obj[searchField] = searchValue
		let ret = await axios.post('http://localhost:8000/search', obj)
		ret = ret.data.doc
		console.log(ret)
		if (ret) {
			props.setName(ret.name)
			props.setBusiness(ret.business)
			props.setAdress(ret.adress)
			props.setPhone(ret.phone)
			props.setService(ret.service)
		}
	}
	return (
		<form className=" m-3" onSubmit={handleSubmit}>
			<div className="form-group row">
				<div className="col-4">
					<div className="">
						<select onChange={e => setSearchField(e.target.value)} className="form-select" id="sel1" name="sellist">
							<option>name</option>
							<option>business</option>
							<option>adress</option>
							<option>phone</option>
							<option>service</option>
						</select>
					</div>
				</div>
				<div className="col">
					<input value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" className="form-control" id="name" placeholder="search field" />
				</div>
			</div>
			<div className="text-center">
				<button type="submit" className="btn btn-secondary">
					Search
				</button>
			</div>
		</form>
	)
}

export default Search
