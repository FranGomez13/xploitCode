const express = require('express');
const router = express.Router();
const passportFacebook = require('../auth/facebook');
const passportGitHub = require('../auth/github');
const passportLocal = require('../auth/local');

/* FACEBOOK ROUTER */
router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get('/facebook/callback', passportFacebook.authenticate('facebook', {failureRedirect: '/login' }),
  	function(req, res) {
    	res.redirect('/user');
	});

/* GITHUB ROUTER */
router.get('/github', passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
	passportGitHub.authenticate('github', { failureRedirect: '/login' }),
  	function(req, res) {
    	res.redirect('/user');
});

/* LOCAL ROUTER */
router.post('/login', passportLocal.authenticate('local-login', {
	successRedirect: '/user',
	failureRedirect: '/login',
	failureFlash: true
}));

router.post('/register', passportLocal.authenticate('local-signup', {
	successRedirect: '/user',
	failureRedirect: '/register',
	failureFlash: true
}));

module.exports = router;