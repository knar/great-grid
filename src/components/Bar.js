import React, { useState, useEffect } from 'react'
import { ChromePicker } from 'react-color'

import { setTile } from '../db.js'

function Bar({ tiles, selected, setSelected }) {
	const [showColorPicker, setShowColorPicker] = useState(false)
	
	useEffect(() => {
		const keyListener = (e) => {
			if (e.key < 'a' || e.key > 'z') return
			setTile('lobby', selected, { chr: e.key.toUpperCase() })
		}
		
		document.addEventListener('keydown', keyListener)

		return (() => {
			document.removeEventListener('keydown', keyListener)
		})
	})

	const renderTile = ({ color, chr }, i) => {
		const className = (i === selected) ? 'palette-tile palette-tile-selected' : 'palette-tile'
		
		const handleClick = () => {
			if (selected === i && showColorPicker) {
				setShowColorPicker(false)
			} else {
				setSelected(i)
				setShowColorPicker(true)
			}
		}

		return (
			<div className={ className } key={ i }>
				<div className='palette-color' style={{ backgroundColor: color }}
					onClick={ handleClick }>{ chr }</div>
				<div className='palette-num'>{ i }</div>
			</div>
		)
	}

	const renderPicker = () => {
		return (
			<div className='picker'>
				<ChromePicker
					color={ tiles[selected].color }
					onChangeComplete= { handleColorChange }
				/>
			</div>
		)
	}

	const handleColorChange = (color) => {
		setTile('lobby', selected, { color: color.hex })
	}

	return (
		<div>
			<div className='palette-container'>
				{ rotateLeft(tiles.map(renderTile)) }
			</div>
			{ showColorPicker ? renderPicker() : null }
		</div>
	)
}

function rotateLeft(a) {
	return [...a.slice(1), a[0]]
}

export default Bar
