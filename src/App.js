import React, { useState, useEffect } from 'react'

import Bar from './components/Bar.js'
import Grid from './components/Grid.js'
import './App.css'

import { subscribeToGrid } from './db.js'

function App() {
	const [gridId, setGridId] = useState(null)
	const [grid, setGrid] = useState({ tiles: [], grid: {}, size: {rows: 0, cols: 0} })
	const [selected, setSelected] = useState(0)

	useEffect(() => {
		const keyListener = (e) => {
			if (e.key < '0' || e.key > '9') return
			setSelected(parseInt(e.key))
		}
		document.addEventListener('keydown', keyListener)
		return (() => {
			document.removeEventListener('keydown', keyListener)
		})
	}, [])

	useEffect(() => {
		const reloadPage = () => window.location.reload()
		window.addEventListener('hashchange', reloadPage, false)
		return (() => {
			window.removeEventListener('hashchange', reloadPage)
		})
	}, [])
	
	useEffect(() => {
		const id = getIdFromUrl()
		subscribeToGrid(id, data => {
			setGridId(id)
			setGrid(data)
		})
	}, [])

	return (
		<div className="App">
			<Bar
				gridId={ gridId }
				tiles={ grid.tiles }
				selected={ selected }
				setSelected= { setSelected }
			/>
			<Grid
				gridId={ gridId }
				grid={ grid }
				selected={ selected }
			/>
		</div>
	)
}

function getIdFromUrl() {
	const hash = window.location.hash
	return hash === '' ? 'lobby' : hash.substring(1)
}

export default App
