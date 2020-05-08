const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const expressValidator = require('express-validator');
const session = require('express-session');
require('dotenv').config()


//init app
const app = express()
//load view engine
app.set('view engine','pug')
//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));



// COPY PASTA
// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
next();
});
// Express Validator Middleware
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
    }
    return {
    param : formParam,
    msg   : msg,
    value : value
    };
}
}));
// passport config
require('./config/passport')(passport)
// http://www.passportjs.org/docs/authenticate/
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null
    next()
})
//END OF COPY PASTA


//bring in models
let Post = require('./models/post')

app.get('/', (req, res) => {
    let query = Post.find( {} ).sort({$natural:-1})
    query.exec(function(err, postsres){
        if(err){
            console.log(err)
        } else {
            res.render('index',{
                posts: postsres
            })
        }
    })
})



// Route files
let posts = require('./routes/posts')
let users = require('./routes/users')
app.use('/posts', posts)
app.use('/users', users)






//start server
const PORT = process.env.PORT || 3000
//connect db
mongoose.connect(process.env.URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
})
	.then(()=>console.log("DB Connected!"))
	.catch(err=>console.log(err))

app.listen(PORT, function(){
    console.log(`server started on port ${PORT}`)
})