const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	cod: String,
	name: String,
	avatar: String,
	email: String,
	password: String,
	provider: String,
	plan: mongoose.Schema.Types.Mixed,
	registerDate: { type: Date, default: Date.now }
}, { collection: 'users' });

//Encriptacion de contraseñas
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Verificacion contraseña
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);