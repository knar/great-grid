import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import Bar from './components/Bar.js'

function App() {
	const [tiles, setTiles] = useState([
		{ color: '#ff6666', chr: 'r' },
		{ color: '#66ff66', chr: 'g' },
		{ color: '#6666ff', chr: 'b' },
	])

	const [selected, setSelected] = useState(0)

	useEffect( () => {
		document.addEventListener('keydown', (e) => {
			if (e.key < '0' || e.key > '9') return
			setSelected(parseInt(e.key))	
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
