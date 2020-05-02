let mongoose = require('mongoose')

//post schema
let postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String, // users id
        required: true
    },
    body:{
        type: String,
        required: true
    }
})

let Post = module.exports = mongoose.model('Post', postSchema)