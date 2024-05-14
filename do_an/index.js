const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home') 
const storePostController = require('./controllers/storePost') 
const getPostController = require('./controllers/getPost')
app.use(fileUpload())
const validateMiddleware = require("./middleware/validationMiddleware"); 
app.use('/posts/store', validateMiddleware)
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


//Đăng ký thư mục public.....
app.use(express.static('public'))

//Tao server
app.listen(4000, () => {
    console.log('OK. App listening on port 4000')
})


app.get('/', homeController);

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.post('/users/register', storeUserController)

app.get('/post/:id', getPostController);


app.get('/posts/new',newPostController)
app.post('/posts/store', storePostController);

app.get('/auth/register', newUserController)

