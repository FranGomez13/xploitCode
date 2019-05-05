const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
	name: String,
	parent: mongoose.Schema.Types.Mixed,
	user: mongoose.Schema.Types.Mixed,
	privacy: String,
	usersShared: Array
}, { collection: 'folders' });

module.exports = mongoose.model('folders', folderSchema);