const typeAccount = require('./models/typeAccount');
const project = require('./models/project');
const ObjectId = require('mongoose').Types.ObjectId;
const mw = require('./middlewares/auth-middleware');

module.exports = (app, passport) => {

	app.get('/', mw.isLogin, (req, res) => {
    	res.render('pages/index');
	});

	app.get('/login', mw.isLogin, (req, res) => {
	    res.render('pages/login', {
	    	message: req.flash('loginMessage')
	    });
	});

	app.get('/register', mw.isLogin, (req, res) => {
		typeAccount.find().then(data=>{
			res.render('pages/register',{
				message: req.flash('singupMessage'),
				type: data
			})
		}).catch(error=>{});
	});

	app.get('/pen/:id', (req, res) => {
		project.find({"_id": ObjectId(req.params.id)})
		.then(data=>{
		    res.render('pages/pen', {
		    	avatar: req.session.passport.user.avatar,
		    	nombre: req.session.passport.user.name,
		    	userId: req.session.passport.user._id,
		    	id: req.params.id,
		    	project: data
		    });
		})
		.catch(error=>{});
	});

	app.put('/pen/:id/save', (req, res)=>{
		project.updateOne({"_id": ObjectId(req.params.id)},
		{$set:{html: req.body.html, js: req.body.js, css: req.body.css}})
		.then(data=>{
			res.send(data);
		}).catch(error=>{});
	})

	app.get('/logout', mw.notLogin, (req, res) => {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});

	app.get('*', (req, res) => {
		res.end('Error 404');
	});
}