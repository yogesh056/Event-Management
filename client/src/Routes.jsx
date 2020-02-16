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
					<LogRoute   exact path="/login" component={WrappedLogin}/>
					<LogRoute   exact path="/signin" component={Stepper}/>
					<PrivateRoute  path="/" component={Dashboard} />
					
				
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
const LogRoute = ({ component: Component, ...rest }) => (
		<Route
		{...rest}
		render={props =>
		!Auth.getAuth() ? (
		<Component {...props} />
		) : (
		<Redirect
		to={{
		pathname: "/"
		}}
		/>
		)
		}
		/>
		);
export default Routes;
