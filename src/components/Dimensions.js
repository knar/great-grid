import React from 'react'

import { setSize } from '../db.js'

export default function Dimensions({ gridId, grid: { size } }) {
	const changeSize = debounce((key, value) => {
		value = parseInt(value) || 0
		value = Math.max(value, 1)
		value = Math.min(value, 100)

		console.log(value)

		setSize(gridId, {
			...size,
			[key]: value,
		})
	}, 200)

	const renderDimension = (key) => {
		return <input type='number' value={ size[key] }
			onChange={ (e) => changeSize(key, e.target.value) }/>
	}

	return (
		<div className='dimensions'>
			{ renderDimension('rows') }
			<div className='dimensions-separator'> x </div>
			{ renderDimension('cols') }
		</div>
	)
}

function debounce(callback, delay) {
	let handle = null
	return (...args) => {
		if (handle) {
			clearTimeout(handle)
		}
		handle = setTimeout(() => {
			callback(...args)
		}, delay)
	}
}
