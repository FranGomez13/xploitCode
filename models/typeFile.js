const mongoose = require('mongoose');

const typeFileSchema = new mongoose.Schema({
	name: String,
	extension: String,
	icon: String
}, { collection: 'typeFiles' });

module.exports = mongoose.model('typeFiles', typeFileSchema);