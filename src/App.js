import React, { useState, useEffect } from 'react'

import Bar from './components/Bar.js'
import './App.css'

import { newGrid, subscribeToGrid } from './db.js'

function App() {
	const [tiles, setTiles] = useState([
		{ color: '#ff6666', chr: 'r' },
		{ color: '#66ff66', chr: 'g' },
		{ color: '#6666ff', chr: 'b' },
	])
	const [selected, setSelected] = useState(0)

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key < '0' || e.key > '9') return
			setSelected(parseInt(e.key))
		})

		subscribeToGrid('lobby', data => {
			setTiles(data.tiles)
		})
	})

	return (
		<div className="App">
			<Bar
				tiles={ tiles }
				selected={ selected }
			/>
		</div>
	)
}

export default App
