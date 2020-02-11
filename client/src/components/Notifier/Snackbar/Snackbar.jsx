import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

let openSnackbarFn;

class Notifier extends React.Component {
	state = {
		open: false,
		message: '',
		variant: ''
	};

	componentDidMount() {
		openSnackbarFn = this.openSnackbar;
	}

	componentWillUnmount() {
		openSnackbarFn = this.openSnackbar;
	}
	//
	openSnackbar = ({ message, variant }) => {
		this.setState({
			open: true,
			message,
			variant
		});
	};

	handleSnackbarClose = () => {
		this.setState({
			open: false,
			message: ''
		});
	};

	getVariant(variant) {
		switch (variant) {
			case 'success':
				return '#27ae60';
			case 'warn':
				return '#f39c12';
			case 'error':
				return '#c0392b';

			default:
				return '#34495e';
		}
	}

	render() {
		const { variant, message } = this.state;

		return (
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				autoHideDuration={3000}
				onClose={this.handleSnackbarClose}
				open={this.state.open}
			>
				<SnackbarContent
					style={{
						backgroundColor: this.getVariant(variant)
					}}
					message={<span id="client-snackbar">{message}</span>}
				/>
			</Snackbar>
		);
	}
}

export function openSnackbar({ message, variant }) {
	openSnackbarFn({ message, variant });
}

export default Notifier;
