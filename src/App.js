import React, { useState, useEffect } from 'react'

import Bar from './components/Bar.js'
import Grid from './components/Grid.js'
import './App.css'

import { newGrid, subscribeToGrid } from './db.js'

function App() {
	const [grid, setGrid] = useState({ tiles: [], grid: {}, size: {rows: 0, cols: 0} })

	const [selected, setSelected] = useState(0)

	useEffect(() => {
		const keyListener = (e) => {
			if (e.key < '0' || e.key > '9') return
			setSelected(parseInt(e.key))
		}

		document.addEventListener('keydown', keyListener)

		subscribeToGrid('lobby', data => {
			setGrid(data)
		})

		return (() => {
			document.removeEventListener('keydown', keyListener)
		})
	}, [])

	return (
		<div className="App">
			<Bar
				tiles={ grid.tiles }
				selected={ selected }
				setSelected= { setSelected }
			/>
			<Grid
				grid={ grid }
				selected={ selected }
			/>
		</div>
	)
}

export default App
