import React from 'react'


function Bar({ tiles, selected }) {

	const renderTile = ({ color, chr }, i) => {
		const className = (i === selected) ? 'palette-tile palette-tile-selected' : 'palette-tile'

		return (
			<div className={ className }>
				<div className='palette-color' style={{ backgroundColor: color }}>
					{ chr }
				</div>
				<div className='palette-num'>{ i }</div>
			</div>
		)
	}

	return (
		<div className='palette-container'>
			{
				rotateLeft(tiles.map(renderTile))
			}
		</div>
	)
}

function rotateLeft(a) {
	return [...a.slice(1), a[0]]
}

export default Bar
