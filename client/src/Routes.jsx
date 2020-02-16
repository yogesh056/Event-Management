/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router ,Redirect} from 'react-router-dom';
import { WrappedLogin } from "./components/LandingPage/Login/Login"
import Stepper from "./components/LandingPage/Stepper/Stepper"
import Dashboard from "../src/components/Dashboard/Dashboard"
import { Layout } from 'antd';
import Auth from './auth/ProtectedRoute';

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount()
	{
		let isLogged = localStorage.getItem('user_id')
		if (isLogged) {
		  Auth.authenticate()
		}
	}

	render() {
		return (
			<Router>
				<Switch>
					<Layout>
					<PrivateRoute  path="/" component={Dashboard} />
					<Route  exact path="/login" component={WrappedLogin} />
					<Route  exact path="/signin" component={Stepper}/>
				
					</Layout>
				</Switch>
			</Router>
		);
	}
}
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
	{...rest}
	render={props =>
	localStorage.getItem('user_id') || Auth.getAuth() ? (
	<Component {...props} />
	) : (
	<Redirect
	to={{
	pathname: "/login"
	}}
	/>
	)
	}
	/>
	);
export default Routes;
