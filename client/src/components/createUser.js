import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Select from 'react-select';
import nationalitie from '../nationalitie';
import Loader from './Loader';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name              : '',
			name_error        : '',
			options           : nationalitie,
			nationality_error : '',
			loading           : false
		};
	}

	//method for name field change
	onChangeHandler = (event) => {
		const name = event.target.name;
		this.setState({ [name]: event.target.value, name_error: '' });
	};

	//method for nationality dropdown
	dropHandler = (event) => {
		this.setState({
			nationality       : event,
			nationality_error : ''
		});
	};

	//method for submiting user
	sumbitHandler = () => {
		//for checking validation
		const validated = this.validateForm();
		if (validated) {
			this.setState({ loading: true });
			const payload = {
				name        : this.state.name,
				nationality : this.state.nationality
			};
			//api call for creating user
			axios({
				url    : '/api/createuser',
				method : 'POST',
				data   : payload
			})
				.then(() => {
					this.setState({ loading: false });
					swal.fire('User created successfully');
					this.props.history.push('/users');
				})
				.catch((err) => {
					alert(err.message);
				});
		}
	};

	//form validation method
	//if form is validated then it will true else false
	validateForm = () => {
		let name_error = '';
		let nationality_error = '';

		if (!this.state.name.match(/^[0-9a-z]+$/)) {
			name_error = 'Name should be alphanumeric';
		}
		if (this.state.name.trim().length < 4) {
			name_error = 'Name should be more than 4 charecters';
		}
		if (!this.state.name.trim().length) {
			name_error = 'Name can not be blank';
		}
		if (!this.state.nationality) {
			nationality_error = 'Nationality can not be blank';
		}

		if (name_error || nationality_error) {
			this.setState({
				name_error,
				nationality_error
			});
			return false;
		}
		return true;
	};

	render() {
		console.log(this.state);
		return (
			<React.Fragment>
				{this.state.loading ? (
					<Loader />
				) : (
					<div
						className="row"
						style={{ overflowX: 'none', marginTop: 100, marginRight: 0, justifyContent: 'center' }}
					>
						<div className="col-6 mt-5">
							<h1 className="text-center">CREATE USER</h1>
							<div className="row mt-3">
								<div className="col-6">
									<div className="form-group">
										<label>Name*</label>
										<input
											type="text"
											className="form-control"
											id="name"
											name="name"
											placeholder="Enter Full Name"
											value={this.state.name}
											onChange={this.onChangeHandler}
										/>
										{this.state.name_error.length ? (
											<small style={{ color: 'red' }}>{this.state.name_error}</small>
										) : null}
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label>Nationality*</label>
										<Select
											onChange={this.dropHandler}
											options={this.state.options}
											placeholder="Select Nationality"
											getOptionLabel={(option) => option.value}
											getOptionValue={(option) => option.id}
										/>
										{this.state.nationality_error.length ? (
											<small style={{ color: 'red' }}>{this.state.nationality_error}</small>
										) : null}
									</div>
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-12">
									<div className="form-group text-center">
										<button className="btn btn-primary w-100" onClick={this.sumbitHandler}>
											Save
										</button>
									</div>
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-12 text-center">
									<a href="/users" style={{ textDecoration: 'none' }}>
										See All Users
									</a>
								</div>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Signup;
