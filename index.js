const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { url } = require('./config/database');
const authRouter = require('./routers/auth-router');
const fileRouter = require('./routers/file-router');
const folderRouter = require('./routers/folder-router');
const newRouter = require('./routers/new-router');
const projectRouter = require('./routers/project-router');
const userRouter = require('./routers/user-router');
const app = express();

// Config
app.use(express.static('public'));
app.set('PORT', process.env.PORT || 3000);
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
mongoose.connect(url, {useNewUrlParser: true});

// Middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 's3cr3tp@ssw0rd',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
app.use('/auth', authRouter);
app.use('/file', fileRouter);
app.use('/folder', folderRouter);
app.use('/new', newRouter);
app.use('/project', projectRouter);
app.use('/user', userRouter);
require('./routes')(app, passport);

//Creacion Socket
const socketIO = require('socket.io').listen(app.listen(app.get('PORT'), () => {
    	console.log('Servidor levantado en el puerto: ' + app.get('PORT'));
	})
);

//Eschucha Eventos Socket Notificaciones
require('./middlewares/socket-middleware')(socketIO);