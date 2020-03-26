import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createUser from './components/createUser';
import allUsers from './components/allUsers';

export default function App() {
	return (
		<Router>
			<div>
				<Route exact path="/" component={createUser} />
				<Route path="/users" component={allUsers} />
			</div>
		</Router>
	);
}
