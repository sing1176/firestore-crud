import './App.css';
import { Switch, Route } from 'react-router-dom';
import NewItemView from './components/NewItemView';
import AppHeader from './components/AppHeader';
import ListView from './components/ListView';
import React, { useState, useEffect } from 'react';
import db from '../src/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
	const [superheros, setSuperheros] = useState([]);

	useEffect(() => {
		const getData = () => {
			onSnapshot(collection(db, 'Superheros'), (snapshot) => {
				setSuperheros(
	 			snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
			});
		};
		getData();
	},[]);


	console.log(superheros);
	

	return (
		<div className="App">
			<header>
				<AppHeader />
			</header>
			<Switch>
				<Route exact path="/">
					<ListView data={superheros} />
				</Route>
				<Route path="/addnewitem">
					<NewItemView />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
