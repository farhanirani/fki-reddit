const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

//bring in user models
let User = require('../models/user')


router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2

    let newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
    })

    newUser.save(function(err){ 
        if(err) {
            console.log(err)
            return
        } else {
            console.log('reistered succ')
            res.redirect('/users/login')
        }
    })

})





router.get('/login', (req, res) => {
    res.render('login')
})






module.exports = router