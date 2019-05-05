module.exports = {
	notLogin: 
		function (req, res, next){
			if(req.isAuthenticated())
				return next();
				req.flash("loginMessage", "Necesita Iniciar Sesion");
			return res.redirect('/login');
		},
	isLogin: 
		function isLogin(req, res, next){
			if (!req.isAuthenticated())
				return next();
			return res.redirect('/user');
		}
}