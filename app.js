const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
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



app.get('/', (req, res) => {
    res.render('index')
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