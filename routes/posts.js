const express = require('express')
const router = express.Router()

//bring in post models
let Post = require('../models/post')
//bring in user models
let User = require('../models/user')


router.get('/edit/:id',ensureAuthenticated, function(req, res){
    Post.findById(req.params.id, (err, post) => {
        if(post.author != req.user._id){
            req.flash('danger','Not Authorized')
            return res.redirect('/')
        }
        res.render('edit_post', {
            post: post
        })
    })
})


router.post('/edit/:id', (req,res) => {
    let post = {};
    post.title = req.body.title
    post.author = req.user._id
    post.body = req.body.body
    
    let query = { _id:req.params.id }

    Post.updateOne(query, post, (err) => {
        if(err) {
            console.log(err)
            return
        } else {
            req.flash('success','Article edited successfully')
            res.redirect('/')
        }
    })

})


router.get('/myposts/:uname', ensureAuthenticated, function(req, res){
    
    User.findOne( {username:req.params.uname}, (err, user) => {
        Post.find( {author:user._id} , (err, postsres) => {
            res.render('my_posts',{
                posts: postsres
            })
        })
    })
})


router.get('/create', ensureAuthenticated, function(req, res){
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


router.get('/delete/:id', ensureAuthenticated, (req, res) => {

    Post.findById(req.params.id, (err, post) => {
        if(post.author != req.user._id){
            res.status(500).send()
        }
        else{
            Post.findByIdAndDelete(req.params.id, (err) => {
                if(err)
                    console.log(err)
            })
            req.flash('primary','Post deleted successfully!')
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



//access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        req.flash('danger','Please login')
        res.redirect('/users/login')
    }
}

module.exports = router