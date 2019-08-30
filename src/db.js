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
	0: { color: '#000', chr: 'A' },
	1: { color: '#111', chr: 'B' },
	2: { color: '#222', chr: 'C' },
	3: { color: '#333', chr: 'D' },
	4: { color: '#444', chr: 'E' },
	5: { color: '#555', chr: 'F' },
	6: { color: '#666', chr: 'G' },
	7: { color: '#777', chr: 'H' },
	8: { color: '#888', chr: 'I' },
	9: { color: '#999', chr: 'J' },
};

const eight = new Array(8).fill(0)
const defaultGrid = Object.fromEntries(
	eight.flatMap((_, i) => eight.map((_, j) => [`${i},${j}`, 0]))
)

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
		grid: defaultGrid,
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
		'grid.size.rows': rows,
		'grid.size.cols': cols,
	})
}
