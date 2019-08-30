import React from 'react'

import { setGrid } from '../db.js'

export default function Grid({ grid: { grid, tiles, size }, selected }) {
	const { rows, cols } = size

	const handleClick = (row, col) => {
		setGrid('lobby', row, col, selected)
	}

	const renderTile = (i, j) => {
		const key = `${i},${j}`
		const gridValue = grid[key]
		const tile = tiles[gridValue]

		return (
			<div className='grid-tile' key={ key }
				style={{ backgroundColor: tile.color }}
				onClick={ () => handleClick(i, j) }
			/>
		)
	}

	return (
		<div className='grid'>
			{range(rows).map(i => (
				<div className='grid-row'>
					{range(cols).map(j => (
						renderTile(i, j)	
					))}
				</div>
			))}
		</div>
	)
}

function range(len) {
	return (new Array(len).fill(0)).map((_, i) => i)
}
