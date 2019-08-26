const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-notes-db', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
	.then(db => console.log('DB is connected'))
	.catch(err => console.error(err));