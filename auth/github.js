const passport = require('passport');
const GitHubStategy = require('passport-github').Strategy;
const user = require('../models/user')
const folder = require('../models/folder')
const config = require('../config/auth')

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GitHubStategy({
		clientID: config.github.clientID,
		clientSecret: config.github.clientSecret,
		callbackURL: config.github.callbackURL,
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
					name: profile.username,
					avatar: profile._json.avatar_url,
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