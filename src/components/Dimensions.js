import React from 'react'

// import { setSize } from '../db.js'

export default function Dimensions({ gridId, grid: { size } }) {
	const renderDimension = (key) => {
		return <input type='number' value={ size[key] }/>
	}

	return (
		<div className='dimensions'>
			{ renderDimension('rows') }
			<div className='dimensions-separator'> x </div>
			{ renderDimension('cols') }
		</div>
	)
}
