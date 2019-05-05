const passport = require('passport');
const FacebookStategy = require('passport-facebook').Strategy;
const user = require('../models/user')
const folder = require('../models/folder')
const config = require('../config/auth')

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new FacebookStategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done){
		user.findOne({
			'cod': profile.id
		},function(err, usr){
			if (err) {return done(err);}
			if (!usr) {
				usr = new user({
					cod: profile.id,
					name: profile.displayName,
					avatar: `http://graph.facebook.com/${profile.id}/picture?type=large&redirect=true&width=480&height=480`,
					provider: profile.provider
				});
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
			} else { return done(null, usr); }
		});
	}
));

module.exports = passport;