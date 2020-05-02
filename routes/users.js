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

    let query = {username:username}
    User.findOne(query, function(err, user){
        if (user) {
            req.flash('danger','Username taken')
            res.render('signup')
        } else {
            req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
            let errors = req.validationErrors();

            if(errors){
                res.render('signup', {
                    errors:errors
                });
            } else {
                let newUser = new User({
                    name:name,
                    email:email,
                    username:username,
                    password:password
                })
        
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if(err){
                            console.log(err)
                        }
                        newUser.password = hash
                        newUser.save(function(err){ 
                            if(err) {
                                console.log(err)
                                return
                            } else {
                                req.flash('success','Registered successfully!!')
                                res.redirect('/users/login')
                            }
                        })
                    })
                })
            }

        }  //end of else user!
    })

    

    
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
}))

//logout
router.get('/logout', function(req, res){
    req.logout()
    req.flash('success','Logged out.')
    res.redirect('/')
})





module.exports = router