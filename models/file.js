const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	name: String,
	content: String,
	folder: mongoose.Schema.Types.Mixed,
	typeFile: mongoose.Schema.Types.Mixed,
	privacy: String,
	usersShared: Array,
	favorite: Boolean
}, { collection: 'files' });

module.exports = mongoose.model('files', fileSchema);