const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: String,
	html: String,
	js: String,
	css: String,
	user: mongoose.Schema.Types.Mixed,
	privacy: String,
	usersShared: Array,
	favorite: Boolean
}, { collection: 'projects' });

module.exports = mongoose.model('projects', projectSchema);