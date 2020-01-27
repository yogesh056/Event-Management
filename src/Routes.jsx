/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from "../src/components/Dashboard/Dashboard"
import Checkout from './components/SignUp/Checkout';
class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Dashboard} />
                    <Route exact path="/signup" component={Checkout} />
				</Switch>
			</Router>
		);
	}
}

export default Routes;
