import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from './constants/app.constants';

import NavBar from './components/NavBar/NavBar.component';
import Compose from './components/Compose/Compose.component';
import Manage from './components/Manage/Manage.component';
import Toast from './components/Toast/Toast.component';

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path={ROUTES.ROOT} component={Compose} />
				<Route exact path={ROUTES.MANAGE} component={Manage} />
			</Switch>
			<Toast />
		</Router>
	);
}

export default App;
