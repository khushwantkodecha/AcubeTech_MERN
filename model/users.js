const mongoose = require('mongoose');

//defining user Schema
const Schema = mongoose.Schema;

const users = new Schema({
	name        : {
		type     : String,
		required : true
	},
	nationality : {
		id    : {
			type     : Number,
			required : true
		},
		value : {
			type     : String,
			required : true
		}
	}
});

//model
const users_model = mongoose.model('users', users);

module.exports = users_model;
