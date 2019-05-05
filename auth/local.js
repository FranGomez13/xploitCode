const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const user = require('../models/user')
const folder = require('../models/folder')

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

//SingUp Local
passport.use('local-signup', new localStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, username, pass, done){
	if (req.body.password!==req.body.password1)
		return done(null, false, req.flash('singupMessage', 'Las contraseñas no coinciden'));
	user.findOne({
		'email': req.body.email
	},function(err, usr){
		if (err) { return done(err); }
			req.session.nombre = username;
		if (!usr) {
			usr = new user();
			usr.name = username;
			usr.avatar = "/img/profile.jpg"
			usr.email = req.body.email;
			usr.password = usr.generateHash(pass);
			usr.provider = "local";
			usr.plan = req.body.typeAccount;
			usr.save(function(err) {
				if (err) { throw err; }
				f = new folder({
					name: "main",
					user: {"_id":usr._id, "name":usr.name},
					privacy: "public",
					usersShared: []
				});
				f.save(function(err){
					if(err) {throw err; }
					return done(null, usr);
				});
			});
		} else { return done(null, false, req.flash('singupMessage', 'Email ya utilizado')); }
	});
}
));

//Login Local
passport.use('local-login', new localStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function (req, usr, password, done){
	user.findOne({$or:[{'email': usr}, {"name": usr}]}, function(err, usr){
		if (err){ return done(err); }
		if (!usr){
			return done(null, false, req.flash('loginMessage', 'Usuario No Encontrado'));
		}
		if (!usr.validPassword(password)){
			return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));	
		}
		return done(null, usr);
	});
}));

module.exports = passport;