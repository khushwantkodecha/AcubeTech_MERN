const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');

mongoose.Promise = global.Promise;

const app = express();
const PORT = 7070 || process.env.PORT;

const mongo_URI =
	'mongodb+srv://khushwantkodecha:khushwantkodecha@mernsignupandsignin-cyktb.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongo_URI || 'mongodb://localhost/mern_first', {
	useNewUrlParser    : true,
	useUnifiedTopology : true
});

mongoose.connection.on('connected', () => console.log('DB CONNECTED!!!'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
