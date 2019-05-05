const mongoose = require('mongoose');

const typeAccountSchema = new mongoose.Schema({
	name: String,
	price: String
}, { collection: 'typeAccount' });

module.exports = mongoose.model('typeAccount', typeAccountSchema);