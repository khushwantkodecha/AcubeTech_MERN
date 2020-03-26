const express = require('express');
//for defining routes
const router = express.Router();

//importing users model
const users = require('../model/users');

//api route for posting a new user
router.post('/createuser', (req, res) => {
	let data = req.body;

	const newUser = new users(data);

	newUser
		.save()
		.then((savedUser) => {
			res.json(savedUser);
		})
		.catch((err) => {
			res.status(500).json({ msg: `Internal server error!!! ${err}` });
		});
});

//api router for fetching list of all uers
router.get('/users', (req, res) => {
	users.find({}).then((user) => res.json(user)).catch((err) => res.status(404).json({ error: err }));
});

//api route for deleting user
router.delete('/users/:id', (req, res) => {
	users
		.findOne({ _id: req.params.id })
		.then((user) => {
			user.remove();
			res.json(user);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

//api for fetching user details before updation
router.get('/users/:id', (req, res) => {
	users
		.findOne({ _id: req.params.id })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

//updation of user
router.put('/users/:id', (req, res) => {
	users.findByIdAndUpdate(req.params.id, req.body).then((user) => res.json({ msg: 'updated' })).catch((err) => {
		res.status(400).json({ error: err });
	});
});

module.exports = router;
