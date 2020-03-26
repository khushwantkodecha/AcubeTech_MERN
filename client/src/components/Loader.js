import React from 'react';
import '../css/Loader.css';

const Loader = () => (
	<div className="text-center spinner">
		<div class="spinner-grow text-muted" />
		<div class="spinner-grow text-primary" />
		<div class="spinner-grow text-success" />
		<div class="spinner-grow text-info" />
		<div class="spinner-grow text-warning" />
		<div class="spinner-grow text-danger" />
		<div class="spinner-grow text-secondary" />
		<div class="spinner-grow text-dark" />
		<div class="spinner-grow text-light" />
	</div>
);

export default Loader;
