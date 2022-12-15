import React, { useState } from 'react'
import axios from 'axios'

function Search(props) {
	const [searchValue, setSearchValue] = useState('')

	async function handleSubmit(e) {
		console.log('handleSubmit')
		e.preventDefault()
		let ret = await axios.post('http://localhost:8000/search', { phone: searchValue })
		ret = ret.data.doc[0]
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
				<div className="col-9">
					<input value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" className="form-control" id="name" placeholder="Search for Data" />
				</div>
				<div className="col">
					<button type="submit" className="btn btn-secondary">
						Search
					</button>
				</div>
			</div>
		</form>
	)
}

export default Search
