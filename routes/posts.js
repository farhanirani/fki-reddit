const express = require('express')
const router = express.Router()

//bring in post models
let Post = require('../models/post')
//bring in user models
let User = require('../models/user')


router.get('/create', function(req, res){
    res.render('create_post')
})

router.post('/create', function(req, res){
    console.log(req.body.body)

    // //get errors
    // let errors = req.validationErrors()
    
    // if(errors){
    //     res.render('add',{
    //         title: 'add article',
    //         errors:errors
    //     })
    // } else {
    //     //new mongodb schema item
    //     let article = new Article()
    //     article.title = req.body.title
    //     article.author = req.user._id
    //     article.body = req.body.body
        
    //     article.save(function(err){ //to add to db
    //         if(err) {
    //             console.log(err)
    //             return
    //         } else {
    //             req.flash('success','Article added')
    //             res.redirect('/')
    //         }
    //     })
    // }   
})


module.exports = router