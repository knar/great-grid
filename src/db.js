import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyDuihQslEyfAK216hIjgwVbsNdXO4oga-g",
	authDomain: "great-grid.firebaseapp.com",
	databaseURL: "https://great-grid.firebaseio.com",
	projectId: "great-grid",
	storageBucket: "great-grid.appspot.com",
	messagingSenderId: "46709538232",
	appId: "1:46709538232:web:074bede9c9289bf5"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const defaultTiles = {
	1: { color: '#45b2c4', chr: 'Z' },
	2: { color: '#cb5342', chr: 'Z' },
	3: { color: '#57a95b', chr: 'Z' },
	4: { color: '#b05cc6', chr: 'Z' },
	5: { color: '#999a3e', chr: 'Z' },
	6: { color: '#7179cb', chr: 'Z' },
	7: { color: '#c88542', chr: 'Z' },
	8: { color: '#cf417e', chr: 'Z' },
	9: { color: '#bf6c92', chr: 'Z' },
	0: { color: '#ffffff', chr: 'X' },
};

export async function subscribeToGrid(id, setGrid) {
	if (!await doesGridExist(id)) {
		await newGrid(id)
	}

	db.collection('grids').doc(id)
		.onSnapshot((doc) => {
			const grid = doc.data();

			// Convert pallete object to array
			grid.tiles = Object.values(grid.tiles)

			setGrid(grid)
		})
}

export async function newGrid(id) {
	await db.collection('grids').doc(id).set({
		size: { rows: 8, cols: 8 },
		tiles: defaultTiles,
		grid: {},
	})

	return id
}

export async function doesGridExist(id) {
	const doc = await db.collection('grids').doc(id).get()
	return doc.exists
}

export async function setTile(id, index, tile) {
	const updates = {};
	for (const [prop, value] of Object.entries(tile)) {
		updates[`tiles.${index}.${prop}`] = value;
	}
	await db.collection('grids').doc(id).update(updates);
}

export async function setGrid(id, row, col, tile) {
	await db.collection('grids').doc(id).update({
		[`grid.${row},${col}`]: tile,
	})
}

export async function setSize(id, { rows, cols }) {
	await db.collection('grids').doc(id).update({
		'size.rows': rows,
		'size.cols': cols,
	})
}
