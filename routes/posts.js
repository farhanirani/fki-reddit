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

    //new mongodb schema item
    let post = new Post()
    post.title = req.body.title
    post.author = req.user._id
    post.body = req.body.body
    
    post.save(function(err){ //to add to db
        if(err) {
            console.log(err)
            return
        } else {
            req.flash('success','Post created')
            res.redirect('/')
        }
    })
})

//get single article
router.get('/:id', function(req, res){
    Post.findById(req.params.id, function(err, post){
        User.findById(post.author, function(err, user){
            res.render('post', {
                post: post,
                author: user.name
            })
        })
    })
})

module.exports = router