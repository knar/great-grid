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

const defaultTiles = [
	{ color: '#000', chr: 'A' },
	{ color: '#111', chr: 'B' },
	{ color: '#222', chr: 'C' },
	{ color: '#333', chr: 'D' },
	{ color: '#444', chr: 'E' },
	{ color: '#555', chr: 'F' },
	{ color: '#666', chr: 'G' },
	{ color: '#777', chr: 'H' },
	{ color: '#888', chr: 'I' },
	{ color: '#999', chr: 'J' },
];

const eight = new Array(8).fill(0)
const defaultGrid = Object.fromEntries(
	eight.flatMap((_, i) => eight.map((_, j) => [`${i},${j}`, 0]))
)

export async function newGrid(id) {
	await db.collection('grids').doc(id).set({
		size: { rows: 8, cols: 8 },
		tiles: defaultTiles,
		grid: defaultGrid,
	})

	return id
}

export function subscribeToGrid(id, setGrid) {
	db.collection('grids').doc(id)
		.onSnapshot((doc) => {
			setGrid(doc.data())
		})
}

