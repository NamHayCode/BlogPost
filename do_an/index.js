const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session'); // Thay đổi tên biến ở đây
const ejs = require('ejs');

// Controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const logoutController = require('./controllers/logout');
const loginUserController = require('./controllers/loginUser');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');

// Middleware
const validateMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// Set view engine
app.set('view engine', 'ejs');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(fileUpload());
app.use(expressSession({ // Sử dụng expressSession ở đây
    secret: 'your_secret_key', // Thay bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt thành true nếu sử dụng HTTPS
}));

// Global variable
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// Static files
app.use(express.static('public'));

// Routes
app.get('/', homeController);
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/logout', logoutController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.use('/posts/store', validateMiddleware);
app.use((req, res) => res.render('notfound'));

// Database connection
mongoose.connect('mongodb://localhost:27017/my_database', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true // Uncomment to use the new Server Discover and Monitoring engine
});

// Server setup
app.listen(4000, () => {
    console.log('OK. App listening on port 4000');
});
