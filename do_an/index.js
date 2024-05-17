const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home') 
const storePostController = require('./controllers/storePost') 
const getPostController = require('./controllers/getPost')
const logoutController = require('./controllers/logout')
const loginUserController = require('./controllers/loginUser')
app.use(fileUpload())
const validateMiddleware = require("./middleware/validationMiddleware"); 
app.use('/posts/store', validateMiddleware)
const authMiddleware = require('./middleware/authMiddleware')
app.get('/posts/new', authMiddleware, newPostController)
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
// const globalMiddleware = require('./middleware/globalMiddleware');
const newUserController = require('./controllers/newUser') 
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
const storeUserController = require('./controllers/storeUser')
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/my_database', {
//   useUnifiedTopology: true // Add this option to use the new Server Discover and Monitoring engine
});
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
   }))

// app.use(globalMiddleware(app));
global.loggedIn = null;
app.use("*", (req, res, next) => {
 loggedIn = req.session.userId;
 next()
});

const loginController = require('./controllers/login')


//Đăng ký thư mục public.....
app.use(express.static('public'))

//Tao server
app.listen(4000, () => {
    console.log('OK. App listening on port 4000')
})

app.get('/auth/logout', logoutController)
app.get('/', homeController);

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})


app.get('/post/:id', getPostController);


app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store', authMiddleware, storePostController)

app.use((req, res) => res.render('notfound'));


app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
