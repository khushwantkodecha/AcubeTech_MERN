import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Modal from 'react-modal';
import Select from 'react-select';
import nationalitie from '../nationalitie';
import Loader from './Loader';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users             : [],
			showModal         : false,
			options           : nationalitie,
			loading           : true,
			name_error        : '',
			nationality_error : ''
		};
	}

	componentDidMount() {
		//method to get list of all users
		this.getUsers();
	}

	getUsers = () => {
		axios({
			url    : '/api/users',
			method : 'GET'
		})
			.then((res) => {
				this.setState({ users: res.data, loading: false });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//method for deleting user
	deleteHandler = (id) => {
		swal
			.fire({
				title              : 'Are you sure?',
				text               : "You won't be able to revert this user!",
				type               : 'warning',
				showCancelButton   : true,
				confirmButtonColor : '#3085d6',
				cancelButtonColor  : '#d33',
				confirmButtonText  : 'Yes!'
			})
			.then((result) => {
				if (result.value) {
					this.setState({ loading: true });
					axios({
						url    : `/api/users/${id}`,
						method : 'delete'
					})
						.then(() => {
							swal.fire('User deleted successfully');
							this.getUsers();
						})
						.catch((err) => console.log(err));
				}
			});
	};

	//method for opeming user updater modal
	handleOpenModal = (id) => {
		this.setState({
			updateId : id,
			loading  : true
		});
		axios({
			url    : `/api/users/${id}`,
			method : 'get'
		})
			.then((res) =>
				this.setState(
					{
						name        : res.data.name,
						nationality : res.data.nationality,
						loading     : false
					},
					() => {
						this.setState({ showModal: true });
					}
				)
			)
			.catch((err) => console.log(err));
	};

	//for closing the updation modal
	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	//for handing new name in updation
	onChangeHandler = (event) => {
		const name = event.target.name;
		this.setState({ [name]: event.target.value, name_error: '' });
	};

	//for handing nationality select box
	dropHandler = (id) => {
		this.setState({
			nationality       : id,
			nationality_error : ''
		});
	};

	//form validation method
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

	//handing the upadation operation
	sumbitHandler = () => {
		const validated = this.validateForm();
		if (validated) {
			this.setState({ loading: true });
			let payload = { name: this.state.name, nationality: this.state.nationality };
			axios({
				url    : `/api/users/${this.state.updateId}`,
				method : 'put',
				data   : payload
			})
				.then(() => {
					this.setState({ loading: false });
					swal.fire('User updated successfully');
					this.handleCloseModal();
					this.getUsers();
				})
				.catch((err) => console.log(err));
		}
	};

	render() {
		return (
			<div>
				{this.state.loading ? (
					<Loader />
				) : (
					<React.Fragment>
						<Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
							<div className="row" style={{ overflowX: 'none', marginTop: 100 }}>
								<div className="col-3" />
								<div className="col-6 mt-5" style={{ overflowX: 'none' }}>
									<h1 className="text-center">Update User</h1>
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
													value={this.state.nationality}
													options={this.state.options}
													placeholder="Select Nationality"
													getOptionLabel={(option) => option.value}
													getOptionValue={(option) => option.id}
													onChange={this.dropHandler}
												/>

												{this.state.nationality_error.length ? (
													<small style={{ color: 'red' }}>
														{this.state.nationality_error}
													</small>
												) : null}
											</div>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-12">
											<div className="form-group text-center">
												<button className="btn btn-primary w-100" onClick={this.sumbitHandler}>
													Update
												</button>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-12">
											<div className="form-group text-center">
												<button
													className="btn btn-danger w-100"
													onClick={this.handleCloseModal}
												>
													Cancel
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal>
						<div className="row">
							<div className="col-2" />
							<div className="col-8 mt-5">
								<h1 className="text-center">USERS</h1>
								<div className="row mt-3">
									<div className="col-12">
										<table class="table table-hover text-center table-bordered">
											<thead className="bg-light">
												<th>Name</th>
												<th>Nationality</th>
												<th>Action</th>
											</thead>
											{this.state.users.length > 0 ? (
												<tbody>
													{this.state.users.map((user, i) => (
														<tr key={i}>
															<td>{user.name}</td>
															<td>{user.nationality.value}</td>
															<td>
																<button
																	className="btn btn-primary"
																	onClick={(e) => this.handleOpenModal(user._id)}
																>
																	Edit
																</button>&nbsp;
																<button
																	className="btn btn-primary"
																	onClick={(e) => this.deleteHandler(user._id)}
																>
																	Delete
																</button>
															</td>
														</tr>
													))}
												</tbody>
											) : (
												<tbody className="tablebody">
													<tr>
														<td colSpan="9">
															<div className="color-gray my-5">
																<i
																	className="fa fa-info-circle fa-6x"
																	style={{ color: '#80808030', fontSize: 100 }}
																	aria-hidden="true"
																/>
																<h3>Nothing to see here</h3>
																<h6>
																	There are no records to show you right now.There may
																	be no entries or your filters may be too tightly
																	defined
																</h6>
															</div>
														</td>
													</tr>
												</tbody>
											)}
										</table>
									</div>
								</div>
							</div>
							<div className="col-2" />
						</div>
						<div className="row mt-3 mb-3">
							<div className="col-12 text-center">
								<a href="/" style={{ textDecoration: 'none' }}>
									Create New User
								</a>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

export default Signin;
